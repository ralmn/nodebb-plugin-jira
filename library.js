/**
 * Created by DHilgaertner on 3/24/14.
 */

(function(module) {
    "use strict";

    var request = require('request'),
        socketTopics = module.parent.require('./socket.io/topics'),
        meta = module.parent.require('./meta'),
        JiraApi = require('jira').JiraApi,
        fs = require('fs'),
        path = require('path'),
        templates = module.parent.require('../public/src/templates.js');

    var JiraPlugin = {}
    var ttl = 60000;
    var cache = {};

    var constants = Object.freeze({
        'name': "Jira Integration",
        'admin': {
            'route': '/jiraplugin',
            'icon': 'fa-check'
        }
    });

    JiraPlugin.registerPlugin = function(custom_header, callback) {
        custom_header.plugins.push({
            "route": constants.admin.route,
            "icon": constants.admin.icon,
            "name": constants.name
        });
        callback(null, custom_header);
    };

    JiraPlugin.addRoute = function(custom_routes, callback) {
        fs.readFile(path.resolve(__dirname, './static/admin.tpl'), function (err, template) {
            custom_routes.routes.push({
                "route": constants.admin.route,
                "method": "get",
                "options": function(req, res, callback) {
                    callback({
                        req: req,
                        res: res,
                        route: constants.admin.route,
                        name: constants.name,
                        content: template
                    });
                }
            });

            callback(null, custom_routes);
        });
    };

    JiraPlugin.addScripts = function(scripts, callback) {
        callback(null, scripts.concat([
            './static/jquery.regex.js',
            './static/jiraplugin/main.js'
        ]));
    };

    socketTopics.checkTicket = function(socket, ticketId, callback) {
        var now = Date.now();

        if(cache[ticketId] && now < cache[ticketId].expireAt) {
            return callback(null, cache[ticketId].ticket);
        }

        var protocol = meta.config['jira:protocol'];
        var domain = meta.config['jira:domain'];
        var port = meta.config['jira:port'];
        var username = meta.config['jira:username'];
        var password = meta.config['jira:password'];

        var jira = new JiraApi(protocol, domain, port, username, password, '2');

        jira.findIssue(ticketId, function(error, ticket) {
            setCache(ticketId, now, ticket);
            return callback(null, ticket);
        });

        callback(null, null);
    };

    function setCache(ticketId, now, ticket) {
        cache[ticketId] = {
            expireAt: now + ttl,
            ticket: ticket
        };
    }

    module.exports = JiraPlugin;

}(module));



