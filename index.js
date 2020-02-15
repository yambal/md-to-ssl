"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var marked = __importStar(require("marked"));
var xml_formatter_1 = __importDefault(require("xml-formatter"));
/**
 * https://marked.js.org/#/USING_PRO.md#renderer
 * @param markdown https://marked.js.org/#/USING_PRO.md#renderer
 * @param title
 * @param description
 */
exports.mdToSsml = function (markdown, title, description) {
    var renderer = new marked.Renderer();
    renderer.heading = function (text, level, raw, slug) {
        // console.log(slug)
        return "<par>\n  <media>\n    <emphasis level=\"strong\">\n    " + text + "\n    </emphasis>\n  </media>\n</par>\n<break time=\"1.5s\" />\n";
    };
    // Blockquote
    renderer.blockquote = function (text) {
        return "<p><prosody rate=\"slow\">" + text + "</prosody></p><break time=\"2s\" />\n";
    };
    // p
    renderer.paragraph = function (text) {
        return "<p>" + text + "</p><break time=\"2s\" />\n";
    };
    // hr
    renderer.hr = function () {
        return "<break time=\"3s\" />\n";
    };
    // list
    renderer.list = function (body, ordered, start) {
        return "<p>" + body + "</p>";
    };
    renderer.listitem = function (text) {
        return "<p>" + text + "</p>";
    };
    // Strong
    renderer.strong = function (text) {
        return "<break time=\"0.25s\" /><emphasis level=\"strong\">" + text + "</emphasis><break time=\"0.25s\" />";
    };
    // BR
    renderer.br = function () {
        return "<break time=\"1s\" />\n";
    };
    // @ts-ignore: Unreachable code error
    var parsed = marked(markdown, { renderer: renderer });
    var openning = "<emphasis level=\"strong\">\n  <prosody rate=\"slow\" pitch=\"+0.12st\">" + title + "</prosody>\n</emphasis>\n<break time=\"2s\" />\n<p>" + description + "</p><break time=\"2s\" />\n";
    var formattedXml = xml_formatter_1.default("<speak><prosody rate=\"125%\">" + openning + parsed + "</prosody></speak>");
    return formattedXml;
};
// <audio src="https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg"></audio>
