"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var ssml = index_1.mdToSsml('# Hello');
console.log(ssml);
var googlessml = index_1.mdToSsml("\n- \u30EA\u30B9\u30C81\n- \u30EA\u30B9\u30C82\n- \u30EA\u30B9\u30C83\n", '', '', {
    google: true
});
console.log(googlessml);
