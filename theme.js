"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selib_1 = require("./selib");
const theme = {
    default: {
        h1: {
            audio: {
                url: selib_1.SeLib.accent44_2,
                soundLevel: '0dB',
                begin: '0s',
            },
            content: {
                begin: '0.75s',
                soundLevel: '+10dB',
                prosody: {
                    rate: '85%',
                }
            },
            break: '1s'
        },
        h2: {
            audio: {
                url: selib_1.SeLib.accent44_2,
                soundLevel: '0dB',
                begin: '0s',
            },
            content: {
                begin: '0.75s',
                soundLevel: '+8dB',
                prosody: {
                    rate: '88%',
                }
            },
            break: '1s'
        },
        h3: {
            audio: {
                url: selib_1.SeLib.accent44_2,
                soundLevel: '0dB',
                begin: '0s',
            },
            content: {
                begin: '0.75s',
                soundLevel: '+6dB',
                prosody: {
                    rate: '91%',
                }
            },
            break: '1s'
        },
        h4: {
            audio: {
                url: selib_1.SeLib.accent44_2,
                soundLevel: '0dB',
                begin: '0s',
            },
            content: {
                begin: '0.75s',
                soundLevel: '+4dB',
                prosody: {
                    rate: '94%',
                }
            },
            break: '1s'
        },
        h5: {
            audio: {
                url: selib_1.SeLib.accent44_2,
                soundLevel: '0dB',
                begin: '0s'
            },
            content: {
                begin: '0.75s',
                soundLevel: '+2dB',
                prosody: {
                    rate: '97%',
                }
            },
            break: '1s'
        },
        h6: {
            audio: {
                url: selib_1.SeLib.accent44_2,
                soundLevel: '0dB',
                begin: '0s',
            },
            content: {
                begin: '0.75s',
                soundLevel: '0dB',
                prosody: {
                    rate: '100%',
                }
            },
            break: '1s'
        },
        blockquote: {
            audio: {
                url: selib_1.SeLib.windytown,
                soundLevel: '0dB',
                begin: '0s',
                end: '+3s',
                fadeOutDur: '2s'
            },
            content: {
                begin: '3s',
            },
            break: '1s'
        },
        listitem: {
            audio: {
                url: selib_1.SeLib.listItem,
                soundLevel: '+40dB',
            },
            content: {
                begin: '0.75s'
            },
            break: '1s'
        },
        hr: {
            audio: {
                url: selib_1.SeLib.hr,
                soundLevel: '+1dB',
                begin: '0s',
            },
            break: '2s'
        },
        link: {
            audio: {
                url: selib_1.SeLib.click1
            },
            before: '0.25s',
            break: '0.25s',
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
const getMedia = (content, id, targetId, soundLevel, begin, end, fadeOutDur) => {
    const fixId = id ? ` xml:id="${id}"` : '';
    const fixTargetId = targetId ? `${targetId}.end` : '';
    const fixSoundLavel = soundLevel ? ` soundLevel="${soundLevel}"` : '';
    const fixBegin = begin ? ` begin="${begin}"` : '';
    const fixEnd = end ? ` end="${fixTargetId}${end}"` : '';
    const fixFadeOutDur = fadeOutDur ? ` fadeOutDur="${fadeOutDur}"` : '';
    return `<media${fixId}${fixSoundLavel}${fixBegin}${fixEnd}${fixFadeOutDur}>${content}</media>`;
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
const makeId = () => {
    var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var N = 4;
    return Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('');
};
exports.getPer = (elementName, content, themeName) => {
    var _a, _b, _c;
    const se = getAudio(elementName, themeName);
    if (se) {
        // audio
        const audio = `<audio src="${se.audio.url}"/>`;
        const beforeBreak = se.before ? `<break time="${se.before}"/>` : '';
        const afterBreak = se.break ? `<break time="${se.break}"/>` : '';
        const id = makeId();
        if (content) {
            const soundMedia = getMedia(audio, null, id, se.audio.soundLevel, se.audio.begin, se.audio.end, se.audio.fadeOutDur);
            let contentSSML = content;
            if (se.content) {
                contentSSML = prosody(contentSSML, (_a = se.content.prosody) === null || _a === void 0 ? void 0 : _a.rate);
            }
            const contentMedia = getMedia(contentSSML, id, null, (_b = se.content) === null || _b === void 0 ? void 0 : _b.soundLevel, (_c = se.content) === null || _c === void 0 ? void 0 : _c.begin);
            return `${beforeBreak}<par>${contentMedia}${soundMedia}</par>${afterBreak}`;
        }
        return `${beforeBreak}${audio}${afterBreak}`;
    }
    return content ? `<p>${content}</p>` : '';
};
