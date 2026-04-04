// ==UserScript==
// @name         deleter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Sets up a deletions PM when run on a page to be deleted
// @author       Unknown + revisions by Kufat
// @match        https://scp-wiki.wikidot.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.href.includes("#d"))
        init()
    async function cromApiRequest(query, variables = null) {
        // Make a fetch request with the query and (optional) variables.
        const response = await fetch("https://api.crom.avn.sh/graphql", {
            method: "POST",
            headers: new Headers({
                "User-Agent": "autolicense",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(variables ? { query, variables } : { query })
        });

        // If the response status code isn't 200, something is up.
        if (!response.ok) {
            throw new Error("Got status code: " + response.status);
        }

        // Parse the response JSON.
        const { data, errors } = await response.json();

        // If there are errors, throw them.
        if (errors && errors.length > 0) {
            throw new Error("Got errors: " + JSON.stringify(errors));
        }

        return data;
    }

    async function init()
    {
        var url = window.location.href.replaceAll("#d","").replaceAll("https:","http:")
        var cromQuery = "query getusers {page(url: \""+url+"\") {attributions { user{wikidotInfo{wikidotId}}} wikidotInfo {source}} }";
        console.log(cromQuery)

        var cromResponce = await cromApiRequest(cromQuery)

        var users = cromResponce["page"]["attributions"]
        users = users.map(unwrap)

        console.log(users)

        var source = cromResponce["page"]["wikidotInfo"]["source"]

        var b64source = window.btoa(unescape(encodeURIComponent(source)))

        for (let i = 0; i < users.length; i++) {
            window.open("https://www.wikidot.com/account/messages#/new/"+users[i]+"?="+b64source)
        }




    }

    function unwrap(input)
    {
        return input["user"]["wikidotInfo"]["wikidotId"]
    }
})();
