import { mdToSsml } from './index'

const ssml = mdToSsml('# Hello')
console.log(ssml)

const googlessml = mdToSsml(`
# Lebel 1
## Lebel 2

- リスト1
- リスト2
- リスト3

---
`, '', '', {
    google: true
})
console.log(googlessml)