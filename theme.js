"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selib_1 = require("./selib");
const theme = {
    default: {
        h1: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '0db',
            begin: '0s',
            contentBegin: '0.75s',
            content: {
                soundLevel: '+12.5db',
                prosody: {
                    rate: '90%',
                }
            },
            break: '1s'
        },
        h2: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '0db',
            begin: '0s',
            contentBegin: '0.75s',
            content: {
                soundLevel: '+10db',
                prosody: {
                    rate: '92%',
                }
            },
            break: '1s'
        },
        h3: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '0db',
            begin: '0s',
            contentBegin: '0.75s',
            content: {
                soundLevel: '+7.5db',
                prosody: {
                    rate: '94%',
                }
            },
            break: '1s'
        },
        h4: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '0db',
            begin: '0s',
            contentBegin: '0.75s',
            content: {
                soundLevel: '+5db',
                prosody: {
                    rate: '96%',
                }
            },
            break: '1s'
        },
        h5: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '0db',
            begin: '0s',
            contentBegin: '0.75s',
            content: {
                soundLevel: '+2.5db',
                prosody: {
                    rate: '98%',
                }
            },
            break: '1s'
        },
        h6: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '0dB',
            begin: '0s',
            contentBegin: '0.75s',
            content: {
                soundLevel: '0dB',
                prosody: {
                    rate: '100%',
                }
            },
            break: '1s'
        },
        listitem: {
            url: selib_1.SeLib.listItem,
            soundLevel: '+40dB',
            begin: '0s',
            contentBegin: '0.75s',
            break: '1s'
        },
        hr: {
            url: selib_1.SeLib.hr,
            soundLevel: '+1dB',
            begin: '0s',
            break: '2s'
        }
    }
};
const getTheme = (themeName) => {
    const name = themeName ? themeName : 'default';
    return theme[name];
};
const getAudio = (elementName, themeName) => {
    const theme = getTheme(themeName);
    if (elementName) {
        return theme[elementName];
    }
    return null;
};
// 韻律
const prosody = (content, rate, volume) => {
    if (volume || rate) {
        const fixVolume = volume ? ` volume="${volume}"` : '';
        const fixrate = rate ? ` rate="${rate}"` : '';
        return `<prosody${fixVolume}${fixrate}>${content}</prosody>`;
    }
    return content;
};
// 強調
const emphasis = (content, level) => {
    if (!level) {
        return content;
    }
    return `<emphasis volume="${level}">${content}</emphasis>`;
};
exports.getPer = (elementName, content, themeName) => {
    var _a;
    const se = getAudio(elementName, themeName);
    if (se) {
        // audio
        const audio = `<audio src="${se.url}"/>`;
        const afterbBreak = se.break ? `<break time="${se.break}"/>` : '';
        if (content) {
            const soundMedia = `<media begin="${se.begin}" soundLevel="${se.soundLevel}">${audio}</media>`;
            let contentSSML = content;
            if (se.content) {
                // contentSSML = emphasis(content, se.content.emphasis.lebel)
                contentSSML = prosody(contentSSML, se.content.prosody.rate);
            }
            const contentMedia = `<media begin="${se.contentBegin}" soundLevel="${(_a = se.content) === null || _a === void 0 ? void 0 : _a.soundLevel}">${contentSSML}</media>`;
            return `<par>${contentMedia}${soundMedia}</par>${afterbBreak}`;
        }
        return `${audio}${afterbBreak}`;
    }
    return content ? `<p>${content}</p>` : '';
};
