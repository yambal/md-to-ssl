"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selib_1 = require("./selib");
const theme = {
    default: {
        h1: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '+12.5db',
            begin: '0s',
            contentBegin: '0.75s',
            content: {
                emphasis: {
                    lebel: 'strong'
                },
                prosody: {
                    volume: '+12.5db',
                    range: '90%',
                }
            },
            break: '1s'
        },
        h2: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '+10db',
            begin: '0s',
            contentBegin: '0.75s',
            content: {
                emphasis: {
                    lebel: 'strong'
                },
                prosody: {
                    volume: '+10db',
                    range: '92%',
                }
            },
            break: '1s'
        },
        h3: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '+7.5db',
            begin: '0s',
            contentBegin: '0.75s',
            content: {
                emphasis: {
                    lebel: 'strong'
                },
                prosody: {
                    volume: '+7.5db',
                    range: '94%',
                }
            },
            break: '1s'
        },
        h4: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '+5db',
            begin: '0s',
            contentBegin: '0.75s',
            content: {
                emphasis: {
                    lebel: 'strong'
                },
                prosody: {
                    volume: '+5db',
                    range: '96%',
                }
            },
            break: '1s'
        },
        h5: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '+2.5db',
            begin: '0s',
            contentBegin: '0.75s',
            content: {
                emphasis: {
                    lebel: 'strong'
                },
                prosody: {
                    volume: '+2.5db',
                    range: '98%',
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
                emphasis: {
                    lebel: 'strong'
                },
                prosody: {
                    volume: '0db',
                    range: '100%',
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
const prosody = (content, volume, range) => {
    if (volume || range) {
        const fixVolume = volume ? ` volume="${volume}"` : '';
        const fixRange = range ? ` range="${range}"` : '';
        return `<prosody${fixVolume}${fixRange}>${content}</prosody>`;
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
    const se = getAudio(elementName, themeName);
    if (se) {
        // audio
        const audio = `<audio src="${se.url}"/>`;
        const afterbBreak = se.break ? `<break time="${se.break}"/>` : '';
        if (content) {
            const soundMedia = `<media begin="${se.begin}" soundLevel="${se.soundLevel}">${audio}</media>`;
            let contentSSML = content;
            if (se.content) {
                contentSSML = emphasis(content, se.content.emphasis.lebel);
                contentSSML = prosody(contentSSML, se.content.prosody.volume, se.content.prosody.range);
            }
            const contentMedia = `<media begin="${se.contentBegin}">${contentSSML}</media>`;
            return `<par>${contentMedia}${soundMedia}</par>${afterbBreak}`;
        }
        return `${audio}${afterbBreak}`;
    }
    return content ? `<p>${content}</p>` : '';
};
