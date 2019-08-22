{
   "ip": "0.0.0.0",
   "dbType": "mysql",
   "dbSettings": {
     "user": "ETHERPAD_DB_USER",
     "host": "ETHERPAD_DB_HOST",
     "password": "ETHERPAD_DB_PASSWORD",
     "database": "etherpad_lite",
     "charset": "utf8mb4"
   },
   "users": {
     "admin": {
       "password": "ETHERPAD_PASSWORD",
       "is_admin": true
     },
     "user": {
       "password": "ETHERPAD_PASSWORD",
       "is_admin": false
     }
   },
   "port":ETHERPAD_PORT,
   "loglevel":"ETHERPAD_LOG_LEVEL",

   "title":"Esper Etherpad",
   "favicon":"favicon.ico",
   "showSettingsInAdminPage":true,
   "defaultPadText":"",
   "padOptions":{
      "noColors":false,
      "showControls":true,
      "showChat":true,
      "showLineNumbers":false,
      "useMonospaceFont":false,
      "userName":true,
      "userColor":false,
      "rtl":false,
      "alwaysShowChat":false,
      "chatAndUsers":false,
      "lang":"en"
   },
   "padShortcutEnabled":{
      "altF9":true,
      "altC":true,
      "cmdShift2":true,
      "delete":true,
      "return":true,
      "esc":true,
      "cmdS":true,
      "tab":true,
      "cmdZ":true,
      "cmdY":true,
      "cmdI":true,
      "cmdB":true,
      "cmdU":true,
      "cmd5":true,
      "cmdShiftL":true,
      "cmdShiftN":true,
      "cmdShift1":true,
      "cmdShiftC":true,
      "cmdH":true,
      "ctrlHome":true,
      "pageUp":true,
      "pageDown":true
   },
   "suppressErrorsInPadText":false,
   "requireSession":false,
   "editOnly":true,
   "sessionNoPassword":false,
   "minify":true,
   "maxAge":43200,
   "abiword":null,
   "soffice":null,
   "tidyHtml":null,
   "allowUnknownFileEnds":true,
   "requireAuthentication":false,
   "requireAuthorization":false,
   "trustProxy":true,
   "disableIPlogging":false,
   "automaticReconnectionTimeout":0,
   "scrollWhenFocusLineIsOutOfViewport":{
      "percentage":{
         "editionAboveViewport":0,
         "editionBelowViewport":0
      },
      "duration":0,
      "scrollWhenCaretIsInTheLastLineOfViewport":false,
      "percentageToScrollWhenUserPressesArrowUp":0
   },
   "socketTransportProtocols":[
      "xhr-polling",
      "jsonp-polling",
      "htmlfile"
   ],
   "loadTest":false,
   "toolbar":{
      "left":[
         [
            "orderedlist",
            "indent",
            "outdent"
         ],
         [
            "undo",
            "redo"
         ],
         [
            "clearauthorship"
         ]
      ],
      "right":[
         [
            "timeslider",
            "savedrevision"
         ],
         [
            "settings"
         ]
      ],
      "timeslider":[
         [
            "timeslider_returnToPad"
         ]
      ]
   },
   "logconfig":{
      "appenders":[
         {
            "type":"console"
         }
      ]
   },
   "ep_comments_page":{
      "highlightSelectedText":true,
      "displayCommentAsIcon":true
   },
   "ep_page_view_default":false,
   "ep_themes_ext":{
      "default":[
         "../custom/KY.css"
      ],
      "AZ":[
         "../custom/AZ.css"
      ],
      "KY":[
         "../custom/KY.css"
      ],
      "MO":[
         "../custom/MO.css"
      ]
   }
}
