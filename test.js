"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const ssml = index_1.mdToSsml('# Hello');
console.log(ssml);
const googlessml = index_1.mdToSsml(`
# Lebel 1
## Lebel 2

- リスト1
- リスト2
- リスト3

---
`, '', '', {
    google: true
});
console.log(googlessml);
