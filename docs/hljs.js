#!/usr/bin/env node

var cli  = require('cli'),
    hljs = require('highlight.js'),
    fs   = require('fs'),
    opts = cli.parse({
        lang: [
            'l',
            'The language of the code, empty for auto',
            'string',
            ''
        ]
    });

cli.withStdin(function(input) {
    if (opts.lang == '') {
        this.output(hljs.highlightAuto(input).value);
    } else {
        this.output(hljs.highlight(opts.lang, input).value);
    }
    process.exit(0)
});