import { SeLib } from './selib'

type tThemeName = undefined | 'default'

interface iElementSeData {
  url: string
  soundLevel: string
  begin: string
  contentsBegin: string
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
      contentsBegin: '0.75s',
      break: '1s'
    },
    h2: {
      url: SeLib.accent44_2,
      soundLevel: '0dB',
      begin: '0s',
      contentsBegin: '0.75s',
      break: '1s'
    },
    h3: {
      url: SeLib.accent44_2,
      soundLevel: '0dB',
      begin: '0s',
      contentsBegin: '0.75s',
      break: '1s'
    },
    h4: {
      url: SeLib.accent44_2,
      soundLevel: '0dB',
      begin: '0s',
      contentsBegin: '0.75s',
      break: '1s'
    },
    h5: {
      url: SeLib.accent44_2,
      soundLevel: '0dB',
      begin: '0s',
      contentsBegin: '0.75s',
      break: '1s'
    },
    h6: {
      url: SeLib.accent44_2,
      soundLevel: '0dB',
      begin: '0s',
      contentsBegin: '0.75s',
      break: '1s'
    },
    listitem: {
      url: SeLib.listItem,
      soundLevel: '+1dB',
      begin: '0s',
      contentsBegin: '0.75s',
      break: '1s'
    },
    hr: {
      url: SeLib.hr,
      soundLevel: '+1dB',
      begin: '0s',
      contentsBegin: '0.75s',
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

export const getPer = (elementName: tElementName, content?: string, themeName?: tThemeName): string => {
  const se = getAudio(elementName, themeName)
  if (se) {
    const audio = `<audio src="${se.url}"/>`
    const afterbBreak = se.break ? `<break time="${se.break}"/>` : ''

    if (content) {
      const soundMedia = `<media begin="${se.begin}" soundLevel="${se.soundLevel}">${audio}</media>`
      const contentMedia = `<media begin="${se.contentsBegin}">${content}</media>`
      return `<par>${contentMedia}${soundMedia}</par>${afterbBreak}`
    }
    return `${audio}${afterbBreak}`
  }
  return `<p>${content}</p>`
}