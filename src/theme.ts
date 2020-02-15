import { SeLib } from './selib'

type tThemeName = undefined | 'default'
type tEmphasisLebel = 'reduced' | 'none' | 'moderate' | 'strong'

interface iElementSeData {
  url: string
  soundLevel: string
  begin: string
  contentBegin?: string
  content?: {
    emphasis: {
      lebel: tEmphasisLebel
    }
    prosody: {
      volume: string // "dB"; or "silent", "x-soft", "soft", "medium", "loud", "x-loud", or "default"
      range: string // % "x-low", "low", "medium", "high", "x-high", or "default"
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
      url: SeLib.accent44_2,
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
      url: SeLib.accent44_2,
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
      url: SeLib.accent44_2,
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
      url: SeLib.accent44_2,
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
      url: SeLib.accent44_2,
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
const prosody = (content: string, volume?: string, range?: string) => {
  if (volume || range) {
    const fixVolume = volume ? ` volume="${volume}"` : ''
    const fixRange = range ? ` range="${range}"` : ''
    return `<prosody${fixVolume}${fixRange}>${content}</prosody>`
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
        contentSSML = emphasis(content, se.content.emphasis.lebel)
        contentSSML = prosody(contentSSML, se.content.prosody.volume, se.content.prosody.range)
      }
      const contentMedia = `<media begin="${se.contentBegin}">${contentSSML}</media>`

      return `<par>${contentMedia}${soundMedia}</par>${afterbBreak}`
    }

    return `${audio}${afterbBreak}`
  }
  return content ? `<p>${content}</p>` : ''
}