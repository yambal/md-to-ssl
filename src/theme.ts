import { SeLib } from './selib'

type tThemeName = undefined | 'default'
type tEmphasisLebel = 'reduced' | 'none' | 'moderate' | 'strong'

interface iMedia {
  url?: string
  soundLevel?: string
  begin?: string
  end?: string
  fadeOutDur?: string
}

interface iConentMedia extends iMedia {
  prosody?: {
    rate: string // % "x-low", "low", "medium", "high", "x-high", or "default"
  }
}

interface iElementSeData {
  audio: iMedia
  content?: iConentMedia
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
  blockquote: iElementSeData
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
      audio: {
        url: SeLib.accent44_2,
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
        url: SeLib.accent44_2,
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
        url: SeLib.accent44_2,
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
        url: SeLib.accent44_2,
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
        url: SeLib.accent44_2,
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
        url: SeLib.accent44_2,
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
        url: SeLib.windytown,
        soundLevel: '0dB',
        begin: '0s',
        end: '12s',
        fadeOutDur: '2s'
      },
      content: {
          begin: '3s',
          end: '3s',
      },
      break: '1s'
  },
    listitem: {
      audio: {
        url: SeLib.listItem,
        soundLevel: '+40dB',
      },
      content: {
        begin: '0.75s'
      },
      break: '1s'
    },
    hr: {
      audio: {
        url: SeLib.hr,
        soundLevel: '+1dB',
        begin: '0s',
      },
      break: '2s'
    },
    link: {
      audio: {
        url: SeLib.click1
      },
      before: '0.25s',
      break: '0.25s',
    }
  }
}

type tElementName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote' | 'listitem' | 'hr' | 'link'

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

const getMedia = (content: string, soundLevel?: string, begin?: string, end?: string, fadeOutDur?: string) => {
  const fixSoundLavel = soundLevel ? ` soundLevel="${soundLevel}"` : ''
  const fixBegin = begin ? ` begin="${begin}"` : ''
  const fixEnd= end ? ` end="${end}"` : ''
  const fixFadeOutDur= fadeOutDur ? ` fadeOutDur="${fadeOutDur}"` : ''
  return `<media${fixSoundLavel}${fixBegin}${fixEnd}${fixFadeOutDur}>${content}</media>`
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
    const audio = `<audio src="${se.audio.url}"/>`
    const beforeBreak = se.before ? `<break time="${se.before}"/>` : ''
    const afterBreak = se.break ? `<break time="${se.break}"/>` : ''

    if (content) {
      const soundMedia = getMedia(audio, se.audio.soundLevel, se.audio.begin, se.audio.end, se.audio.fadeOutDur)
      let contentSSML = content
      if (se.content) {
        contentSSML = prosody(contentSSML, se.content.prosody?.rate)
      }
      const contentMedia = getMedia(contentSSML, se.content?.soundLevel, se.content?.begin)
      return `${beforeBreak}<par>${contentMedia}${soundMedia}</par>${afterBreak}`
    }

    return `${beforeBreak}${audio}${afterBreak}`
  }
  return content ? `<p>${content}</p>` : ''
}