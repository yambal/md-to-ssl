import { SeLib } from './selib'

type tThemeName = undefined | 'default'
type tEmphasisLebel = 'reduced' | 'none' | 'moderate' | 'strong'

interface iElementSeData {
  url: string
  soundLevel: string
  begin: string
  contentBegin?: string
  content?: {
    soundLevel: string
    prosody: {
      rate: string // % "x-low", "low", "medium", "high", "x-high", or "default"
    }
  }
  before?: string
  break?: string
}

interface iTheme {
  h1: iElementSeData
  h2: iElementSeData
  h3: iElementSeData
  h4: iElementSeData
  h5: iElementSeData
  h6: iElementSeData
  listitem: iElementSeData
  hr: iElementSeData
  link: iElementSeData
}
interface iThemes {
  default: iTheme
}

const theme: iThemes = {
  default: {
    h1: {
      url: SeLib.accent44_2,
      soundLevel: '0dB',
      begin: '0s',
      contentBegin: '0.75s',
      content: {
        soundLevel: '+10dB',
        prosody: {
          rate: '85%',
        }
      },
      break: '1s'
    },
    h2: {
      url: SeLib.accent44_2,
      soundLevel: '0dB',
      begin: '0s',
      contentBegin: '0.75s',
      content: {
        soundLevel: '+8dB',
        prosody: {
          rate: '88%',
        }
      },
      break: '1s'
    },
    h3: {
      url: SeLib.accent44_2,
      soundLevel: '0dB',
      begin: '0s',
      contentBegin: '0.75s',
      content: {
        soundLevel: '+6dB',
        prosody: {
          rate: '91%',
        }
      },
      break: '1s'
    },
    h4: {
      url: SeLib.accent44_2,
      soundLevel: '0dB',
      begin: '0s',
      contentBegin: '0.75s',
      content: {
        soundLevel: '+4dB',
        prosody: {
          rate: '94%',
        }
      },
      break: '1s'
    },
    h5: {
      url: SeLib.accent44_2,
      soundLevel: '0dB',
      begin: '0s',
      contentBegin: '0.75s',
      content: {
        soundLevel: '+2dB',
        prosody: {
          rate: '97%',
        }
      },
      break: '1s'
    },
    h6: {
      url: SeLib.accent44_2,
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
      url: SeLib.listItem,
      soundLevel: '+40dB',
      begin: '0s',
      contentBegin: '0.75s',
      break: '1s'
    },
    hr: {
      url: SeLib.hr,
      soundLevel: '+1dB',
      begin: '0s',
      break: '2s'
    },
    link: {
      url: SeLib.click1,
      soundLevel: '0dB',
      begin: '0s',
      contentBegin: '0.75s',
      content: {
        soundLevel: '0dB',
        prosody: {
          rate: '100%',
        }
      },
      before: '0.25s',
      break: '0.25s',
    }
  }
}

type tElementName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'listitem' | 'hr' | 'link'

const getTheme = (themeName: tThemeName): iTheme => {
  const name: tThemeName = themeName ? themeName : 'default'
  return theme[name]
}

const getAudio = (elementName: tElementName, themeName?: tThemeName): iElementSeData | null => {
  const theme = getTheme(themeName)
  if (elementName) {
    return theme[elementName]
  }
  return null
}

// 韻律
const prosody = (content: string, rate?: string, volume?: string) => {
  if (volume || rate) {
    const fixVolume = volume ? ` volume="${volume}"` : ''
    const fixrate = rate ? ` rate="${rate}"` : ''
    return `<prosody${fixVolume}${fixrate}>${content}</prosody>`
  }
  return content
}

// 強調
const emphasis = (content: string, level?: tEmphasisLebel) => {
  if (!level) {
    return content
  }
  return `<emphasis volume="${level}">${content}</emphasis>`
}

export const getPer = (elementName: tElementName, content?: string, themeName?: tThemeName): string => {
  const se = getAudio(elementName, themeName)
  if (se) {
    // audio
    const audio = `<audio src="${se.url}"/>`
    const beforeBreak = se.before ? `<break time="${se.before}"/>` : ''
    const afterBreak = se.break ? `<break time="${se.break}"/>` : ''

    if (content) {
      const soundMedia = `<media begin="${se.begin}" soundLevel="${se.soundLevel}">${audio}</media>`

      let contentSSML = content
      if (se.content) {
        // contentSSML = emphasis(content, se.content.emphasis.lebel)
        contentSSML = prosody(contentSSML, se.content.prosody.rate)
      }
      const contentMedia = `<media begin="${se.contentBegin}" soundLevel="${se.content?.soundLevel}">${contentSSML}</media>`

      return `${beforeBreak}<par>${contentMedia}${soundMedia}</par>${afterBreak}`
    }

    return `${beforeBreak}${audio}${afterBreak}`
  }
  return content ? `<p>${content}</p>` : ''
}