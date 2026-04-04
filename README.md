## Deletions Process User Scripts

These userscripts exist to automate some steps within the [SCP Wiki Deletions Process](https://scpwiki.com/deletions-guide).

1. The `deleter` script is run first on a wiki page to be deleted. It sets up Wikidot PMs to each of the authors with the article's wikitext as base64.
2. The `robocimm` script is run second and turns that encoded data into the actual body of the deletions PM.
