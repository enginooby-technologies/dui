export const settingFilePath: string = `/dynamic-ui-framework/setting.html`;
// ad-hoc fallback to load file on remote server for different projects
// TODO: resolve CORS or use CDN
export const fallbackSettingFilePath: string = 'https://enginoobz.com/dynamic-ui-framework/setting.html';
// export const settingFilePath: string = `/dynamic-ui-framework/setting.php`;
export enum StyleName { //  same as selectors in init SCSS
        Flat = 'flat-style',
        Neu = 'neu-style',
        Glass = 'glass-style',
        Nes = 'nes-style',
        Win98 = 'win98-style',
}

// DEPENDENCIES
type Script = {
        src: string;
        integrity?: string;
        crossOrigin?: string;
        referrerPolicy?: string;
}
export const interactJs: Script = {
        src: "https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"
}
export const webfontJs: Script = {
        src: "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
}
export const tinyColorJs: Script = {
        src: "https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.2/tinycolor.min.js",
        integrity: "sha512-+aXA9mgbUvFe0ToTlbt8/3vT7+nOgUmFw29wfFCsGoh8AZMRSU0p4WtOvC1vkF2JBrndPN2TuNZsHPAKPPxe8Q==",
        crossOrigin: "anonymous",
        referrerPolicy: "no-referrer"
}