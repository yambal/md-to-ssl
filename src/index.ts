import * as marked from 'marked'
import format from 'xml-formatter';

/**
 * https://marked.js.org/#/USING_PRO.md#renderer
 * @param markdown https://marked.js.org/#/USING_PRO.md#renderer
 * @param title 
 * @param description 
 */

export const mdToSsml = (markdown: string, title?: string, description?: string) => {
  const renderer = new marked.Renderer()

  renderer.heading = (text: string, level: number, raw: string, slug: any) => {
    // console.log(slug)
    return `<par>
  <media>
    <emphasis level="strong">
    ${text}
    </emphasis>
  </media>
</par>
<break time="1.5s" />
`};

  // Blockquote
  renderer.blockquote = (text: string) => {
    return `<p><prosody rate="slow">${text}</prosody></p><break time="2s" />\n`}

  // p
  renderer.paragraph = (text: string) => {
    return `<p>${text}</p><break time="2s" />\n`}

  // hr
  renderer.hr= () => {
    return `<break time="3s" />\n`}

  // list
  renderer.list = (body: string, ordered: boolean, start: number) => {
    return `<p>${body}</p>`}
  renderer.listitem = (text: string) => {
    return `<p>${text}</p>`}

  // Strong
  renderer.strong = function (text: string) {
    return `<break time="0.25s" /><emphasis level="strong">${text}</emphasis><break time="0.25s" />`
  };

  // BR
  renderer.br = function () {
    return `<break time="1s" />\n`
  };

  // @ts-ignore: Unreachable code error
  const parsed = marked(markdown, { renderer: renderer })

  const openning = `<emphasis level="strong">
  <prosody rate="slow" pitch="+0.12st">${title}</prosody>
</emphasis>
<break time="2s" />
<p>${description}</p><break time="2s" />\n`

  var formattedXml = format(`<speak><prosody rate="125%">${openning}${parsed}</prosody></speak>`);
  return formattedXml
}

// <audio src="https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg"></audio>