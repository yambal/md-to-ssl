"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marked_1 = __importDefault(require("marked"));
const xml_formatter_1 = __importDefault(require("xml-formatter"));
const theme_1 = require("./theme");
/**
 * https://marked.js.org/#/USING_PRO.md#renderer
 * @param markdown https://marked.js.org/#/USING_PRO.md#renderer
 * @param title
 * @param description
 */
exports.mdToSsml = (markdown, title, description, options = {}) => {
    const { google: isGoogle = false } = options;
    const renderer = new marked_1.default.Renderer();
    renderer.heading = (text, level, raw, slug) => {
        if (isGoogle) {
            // @ts-ignore: Unreachable code error
            return theme_1.getPer(`h${level}`, text);
        }
        return `<emphasis level="strong">${text}</emphasis><break time="1.5s" />`;
    };
    // Blockquote
    renderer.blockquote = (text) => {
        if (isGoogle) {
            return theme_1.getPer('blockquote', text);
        }
        return `<p><prosody rate="slow">${text}</prosody></p><break time="2s" />\n`;
    };
    // p
    renderer.paragraph = (text) => {
        return `<p>${text}</p><break time="1.5s" />\n`;
    };
    // hr
    renderer.hr = () => {
        if (isGoogle) {
            return theme_1.getPer('hr');
        }
        return `<break time="3s" />\n`;
    };
    // list
    renderer.list = (body, ordered, start) => {
        return `<p>${body}</p>`;
    };
    renderer.listitem = (text) => {
        if (isGoogle) {
            return theme_1.getPer('listitem', text);
        }
        return `<p>${text}</p>`;
    };
    // Strong
    renderer.strong = function (text) {
        return `<break time="0.25s" /><emphasis level="strong">${text}</emphasis><break time="0.25s" />`;
    };
    // BR
    renderer.br = function () {
        return `<break time="0.5s" />`;
    };
    // EM
    renderer.em = function () {
        return `<break time="1s" />`;
    };
    /*
    renderer.em = function (text: string) {
      return `<d>${text}</d>`
    };
    */
    renderer.link = (href, title, text) => {
        if (isGoogle) {
            return theme_1.getPer('link', text);
        }
        return `<d>${href}, ${title}, ${text}</d>`;
    };
    // @ts-ignore: Unreachable code error
    const parsed = marked_1.default(markdown, { renderer: renderer });
    const openning = `<emphasis level="strong">
  <prosody rate="slow" pitch="+0.12st">${title}</prosody>
</emphasis>
<break time="2s" />
<p>${description}</p><break time="2s" />\n`;
    const xml = `<speak>${openning}${parsed}</speak>`;
    // console.log(xml)
    var formattedXml = xml_formatter_1.default(xml);
    return formattedXml;
};
// <audio src="https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg"></audio>
