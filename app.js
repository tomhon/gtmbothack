var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// App Insights Setup - 
// assumes instrumentation keycmd set in the environment variable APPINSIGHTS_INSTRUMENTATIONKEY 
//=========================================================

var appInsights = require("applicationinsights");
appInsights.setup;
var client = appInsights.getClient();

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    var client = appInsights.getClient();

    client.trackEvent("Bot Root called", {customProperty: "custom property value"});
    // client.trackException(new Error("handled exceptions can be logged with this method"));
    // client.trackMetric("custom metric", 3);
    // client.trackTrace("trace message");
    session.send("Hello World");
});

//=========================================================
// Server Response
//=========================================================

server.get('/', function (req, res) { 
    res.send('GTM Bot Running'); 
    }); 