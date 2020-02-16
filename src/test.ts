import { mdToSsml } from './index'

//const ssml = mdToSsml('# Hello')
//console.log(ssml)

const googlessml = mdToSsml(`
# Lebel 1
## Lebel 2

- リスト1
- リスト2
- リスト3

1. 番号付きリスト1
2. 番号付きリスト2
3. 番号付きリスト3

*イタリック*

[Google先生](https://www.google.co.jp/)

> 思い出したいのに、忘れられない。
> by 鳳啓介

---
`, '', '', {
    google: true
})
console.log(googlessml)