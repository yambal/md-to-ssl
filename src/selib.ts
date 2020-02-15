export interface iSe {
    url: string
    soundLevel: string
    begin: string
    contentsBegin: string
}

const listitemSe: iSe = {
    url: 'https://yambal.github.io/md-to-ssl/se/list-item.mp3',
    soundLevel : '+1dB',
    begin: '0s',
    contentsBegin: '0.75s'
}


export const selib = {
    listitem: listitemSe
}
