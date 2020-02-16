import { mdToSsml } from './index'

//const ssml = mdToSsml('# Hello')
//console.log(ssml)

const googlessml = mdToSsml(`
# Lebel 1
## Lebel 2

- リスト1
- リスト2
- リスト3

*イタリック*

[Google先生](https://www.google.co.jp/)

---
`, '', '', {
    google: true
})
console.log(googlessml)