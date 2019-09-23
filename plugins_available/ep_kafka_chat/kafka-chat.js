
var log4js = require('log4js');
var logger = log4js.getLogger("kafka-chat");
var settings = require("ep_etherpad-lite/node/utils/Settings");
var kafka = require('kafka-node');
var authorManager = require('ep_etherpad-lite/node/db/AuthorManager');
var util = require('util');

// for debugging set this ENV var
// export DEBUG="kafka-node:*"

var getAuthorName = authorManager.getAuthorName;

var enabled = false;
var connected = false;
var producer = null;
var topicName = null;

function extractCommentPayload(dbValue, activityType, padId) {
    var recent = Object.entries(dbValue).reduce((recent, [key, val]) => {
        if (recent == null) {
            recent = {"key": key, "value": val};
        } else if (val.timestamp > recent.value.timestamp) {
            recent.key = key;
            recent.value = val;
        }
        return recent;
    }, null);
    var timeStamp = recent.value.timestamp;
    var authorName = recent.value.name;
    var id = recent.key;
    var payload = {
        "type": activityType,
        "author": authorName,
        "timestamp": timeStamp,
        "padId": padId
    };
    if (activityType == "comment") {
        payload['commentId'] = id;
    } else if (activityType == "comment-reply") {
        payload['commentReplyId'] = id;
        payload['commentId'] = recent.value.commentId;
    }
    return payload;
}

function sendToKafka(payload) {
    if (connected && topicName != null && payload != null) {
        producer.send([{"topic": topicName, "messages": JSON.stringify(payload)}], function (err, data) {
            if (err) {
                logger.error("failed to send to kafka", err);
                logger.info(util.inspect(err));
            } else {
                logger.info("comment data posted to kafka");
            }
        });
    }
}

exports.dbSet = function(hook_name, args, cb) {
    if (enabled) {
        var dbKey = args.key;
        var dbValue = args.value;
        var payload = null;
        var padId = '';
        if (dbKey.startsWith("comments:")) {
            // it's a comment
            padId = dbKey.match(/comments:(.*)/)[1];
            payload = extractCommentPayload(dbValue, "comment", padId);
            logger.info("sending %o", payload);
            sendToKafka(payload);
        } else if (dbKey.startsWith("comment-replies:")) {
            // it's a comment reply
            padId = dbKey.match(/comment-replies:(.*)/)[1];
            payload = extractCommentPayload(dbValue, "comment-reply", padId);
            logger.info("sending %o", payload);
            sendToKafka(payload);
        } else if ((new RegExp('pad:.*:chat:.*')).test(dbKey)) {
            // it's a chat : we need to resolve the users friendly name
            getAuthorName(dbValue.userId, function(err, authorName) {
                if (err != null) {
                    logger.warn("failed to lookup user name", err);
                    authorName = "";
                }
                padId = dbKey.match(/pad:(.*?):chat:.*/)[1];
                payload = {
                    "type" : "chat",
                    "author" : authorName,
                    "timestamp" : dbValue.time,
                    "padId" : padId
                };
                logger.info("sending %o", payload);
                sendToKafka(payload);
            });
        }
    }
};

exports.expressCreateServer = function (hook_name, args, cb) {
    logger.info("initializing the kafka integration");
    if (settings.ep_kafka_chat) {
        if (settings.ep_kafka_chat.enabled) {
            logger.info("kafka integration enabled");
            enabled = true;
            const client = new kafka.KafkaClient({
                    "kafkaHost" : settings.ep_kafka_chat.kafka_bootstrap_hosts,
                    "requestTimeout" : 1000
            });
            producer = new kafka.Producer(client);

            producer.on('ready', async function() {
                logger.info("connected to kafka");
                connected = true;
            });

            producer.on('error', async function() {
                logger.info("disconnected from kafka");
                connected = false;
            });
        } else {
            logger.info("kafka integration disabled")
        }
        topicName = settings.ep_kafka_chat.topic;
    } else {
        logger.info("kafka integration not configured")
    }
};