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
        soundLevel: '+15dB',
        prosody: {
          rate: '80%',
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
        soundLevel: '+12dB',
        prosody: {
          rate: '85%',
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
        soundLevel: '+9dB',
        prosody: {
          rate: '90%',
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
        soundLevel: '+6dB',
        prosody: {
          rate: '95%',
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
        soundLevel: '+3dB',
        prosody: {
          rate: '100%',
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
    }
  }
}

type tElementName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'listitem' | 'hr'

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
    const afterbBreak = se.break ? `<break time="${se.break}"/>` : ''

    if (content) {
      const soundMedia = `<media begin="${se.begin}" soundLevel="${se.soundLevel}">${audio}</media>`

      let contentSSML = content
      if (se.content) {
        // contentSSML = emphasis(content, se.content.emphasis.lebel)
        contentSSML = prosody(contentSSML, se.content.prosody.rate)
      }
      const contentMedia = `<media begin="${se.contentBegin}" soundLevel="${se.content?.soundLevel}">${contentSSML}</media>`

      return `<par>${contentMedia}${soundMedia}</par>${afterbBreak}`
    }

    return `${audio}${afterbBreak}`
  }
  return content ? `<p>${content}</p>` : ''
}