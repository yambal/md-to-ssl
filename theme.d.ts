declare type tThemeName = undefined | 'default';
declare type tElementName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote' | 'listitem' | 'hr' | 'link';
export declare const getPer: (elementName: tElementName, content?: string | undefined, themeName?: tThemeName) => string;
export declare const bgmManager: () => {
    header: (level: number, text: string) => string;
    blockquote: (text: string) => string;
    getBgmCloser: () => string;
    setHasContent: () => void;
};
export {};
