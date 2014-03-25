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
        $('.post-content :regex(\\[[a-zA-Z]+\\-[0-9]+\\])').each(function(index, element) {

            var match = $(element);

            socket.emit('topics.checkTicket', match.innerHTML, function(err, result) {
                if(result) {
                    $(match).replaceWith('<b>JIRA TAG FOUND!!!</b>');
                }
            });
        });
    }
}());