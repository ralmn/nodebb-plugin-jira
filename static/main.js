/**
 * Created by DHilgaertner on 3/24/14.
 */

(function() {
    "use strict";

    $(document).bind('DOMNodeInserted', function(event) {

        if(!$('.topic').length || $(event.target).hasClass('jira-plugin')) {
            return;
        }

        replaceJiraTickets();
    });

    function replaceJiraTickets() {
        $('.post-content a:regex(href, https://cinchcast.jira.com/browse/[a-zA-Z]+-[0-9]+)').each(function(index, element) {
            var match = $(element);

            if (!match.hasClass("processed")){
                var ticketId = match.html().replace('https://cinchcast.jira.com/browse/', '');

                socket.emit('topics.checkTicket', ticketId, function(err, result) {
                    if(result) {
                        var assignee = result.fields.assignee ? result.fields.assignee.displayName : 'none';
                        var ticketUrl = "https://cinchcast.jira.com/browse/" + result.key;

                        $(match).replaceWith('<span>' +
                            '<span>[<a class="processed" href="' + ticketUrl + '">' + result.key + '</a>]</span> - ' +
                            '<img style="margin-bottom: 3px;" src="' + result.fields.status.iconUrl + '" /> <b>' + result.fields.status.name + '</b> - ' +
                            '<b>' + result.fields.summary + '</b> - ' +
                            'Assignee: <b>' + assignee + '</b>' +
                        '</span>');
                    }
                });
            }
        });
    }
}());