
var db = require('ep_etherpad-lite/node/db/DB');

var lastCheckTime = null;
var lastStatusCode = 200;
var lastMessage = "OK";

exports.expressCreateServer = function (hook_name, args, cb) {
    args.app.get('/check', function(req, res) {
        //res.send("<em>Abra cadabra</em>");
        // dont hit this all the time
        var now = Date.now();
        if (lastCheckTime == null || now - lastCheckTime > 30000) {
            console.log("running check  " + (now - lastCheckTime));
            db.db.get("pad:0", function (err, pad) {
                console.log("err " + err);
                console.log("pad " + pad);

                // expect pad will be undefined, but don't really care
                // expect err to be null unless db is broken
                if (err != null) {
                    console.log("got a db error" + err);
                    lastStatusCode = 500;
                    lastMessage = "ERROR\ndatabase connectivity issue";
                } else {
                    lastStatusCode = 200;
                    lastMessage = "OK";
                }

                lastCheckTime = Date.now();
                res.status(lastStatusCode);
                res.send("status:" + lastMessage);
            });
        }
        else {
            res.status(lastStatusCode);
            res.send("status:" + lastMessage);
        }
    });
}