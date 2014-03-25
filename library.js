/**
 * Created by DHilgaertner on 3/24/14.
 */

(function(module) {
    "use strict";

    var request = require('request'),
        socketTopics = module.parent.require('./socket.io/topics');

    var JiraPlugin = {}

    var ttl = 60000;
    var cache = {};

    socketTopics.checkTicket = function(socket, ticketId, callback) {
        var now = Date.now();

        if(cache[ticketId] && now < cache[ticketId].expireAt) {
            return callback(null, cache[ticketId].ticket);
        }

//        request({url:"...api here...", method:'POST'}, function (error, response) {
//            var ticket = response;
//
//            setCache(ticket, now, state);
//            callback(null, state);
//        });
        callback(null, true);
    };

    function setCache(ticketId, now, ticket) {
        cache[ticketId] = {
            expireAt: now + ttl,
            state: ticket
        };
    }

    JiraPlugin.addScripts = function(scripts, callback) {
        return scripts.concat([
            'plugins/jiraplugin/jquery.regex.js',
            'plugins/jiraplugin/main.js'
        ]);
    };

    module.exports = JiraPlugin;

}(module));



