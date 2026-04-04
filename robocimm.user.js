// ==UserScript==
// @name         robocimm
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Automatically populate a deletions PM opened by the 'deleter' userscript
// @author       Cimmerian? + revisions by Kufat
// @match        https://www.wikidot.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wikidot.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("start");
    window.onload = delayer;

    function delayer()
    {
        setTimeout(init,500);
    }

    function init()
    {
        var spliturl = window.location.href.split("=")
        if(spliturl.length > 1)
        {
            var source = decodeURIComponent(escape(window.atob(spliturl[1])))
            console.log(source);
            var subject = document.getElementById("pm-subject");
            if(typeof(subject) == "undefined" || subject == null)
            {
                setTimeout(init,500); // infinite loop if something stupid is happening, but harmless
                return;
            }
            subject.value ="Staff PM - Deletions Notice";

            const usernameHTML = document.getElementById("selected-user-rendered").innerHTML;
            const unameRegex = /onclick\="WIKIDOT\.page\.listeners\.userInfo\(\d+\)">([-_\s\w]+)<\/a><\/span>/;
            const match = usernameHTML.match(unameRegex);

            const username = match.length == 2 ? match[1] : "Hello";

            var text =
`${username},

This is a notification from the SCP Foundation wiki.

A mainsite page created by you has recently been deleted, due to its rating falling below deletion threshold set by the guidelines here: [https://scp-wiki.wikidot.com/deletions-guide Deletions Guide]. I'm sending you the source text for the most recent version for your records. Feel free to edit the code in a [https://scp-sandbox-3.wikidot.com sandbox page] and post a revised version to the site when you've gotten feedback on a suitably-edited draft.

Additionally, you may find it helpful to bring your concept to the [https://scp-wiki.wikidot.com/forum/c-89000/help:ideas-critique Ideas Critique forum] before you try fixing the draft. You can go to that forum, post a //quick summary// of the concept you want to write up (don't link the draft unless someone asks), and reviewers there can help you make the idea more interesting and give you some advice on structuring the eventual article for smoothness of reading and narrative.
[[collapsible]]
[[code]]
${source}
[[/code]]
[[/collapsible]]

If you have any questions about deletions, you may contact a staff member.`;

            document.getElementById("editor-textarea").value = text;
        }

    }

})();
