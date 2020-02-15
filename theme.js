"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selib_1 = require("./selib");
const theme = {
    default: {
        h1: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '0dB',
            begin: '0s',
            contentsBegin: '0.75s',
            break: '1s'
        },
        h2: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '0dB',
            begin: '0s',
            contentsBegin: '0.75s',
            break: '1s'
        },
        h3: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '0dB',
            begin: '0s',
            contentsBegin: '0.75s',
            break: '1s'
        },
        h4: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '0dB',
            begin: '0s',
            contentsBegin: '0.75s',
            break: '1s'
        },
        h5: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '0dB',
            begin: '0s',
            contentsBegin: '0.75s',
            break: '1s'
        },
        h6: {
            url: selib_1.SeLib.accent44_2,
            soundLevel: '0dB',
            begin: '0s',
            contentsBegin: '0.75s',
            break: '1s'
        },
        listitem: {
            url: selib_1.SeLib.listItem,
            soundLevel: '+1dB',
            begin: '0s',
            contentsBegin: '0.75s',
            break: '1s'
        },
        hr: {
            url: selib_1.SeLib.hr,
            soundLevel: '+1dB',
            begin: '0s',
            contentsBegin: '0.75s',
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
exports.getPer = (elementName, content, themeName) => {
    const se = getAudio(elementName, themeName);
    if (se) {
        const audio = `<audio src="${se.url}"/>`;
        const afterbBreak = se.break ? `<break time="${se.break}"/>` : '';
        if (content) {
            const soundMedia = `<media begin="${se.begin}" soundLevel="${se.soundLevel}">${audio}</media>`;
            const contentMedia = `<media begin="${se.contentsBegin}">${content}</media>`;
            return `<par>${contentMedia}${soundMedia}</par>${afterbBreak}`;
        }
        return `${audio}${afterbBreak}`;
    }
    return `<p>${content}</p>`;
};
