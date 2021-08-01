export const settingFilePath: string = `/dynamic-ui-framework/setting.html`;
// ad-hoc fallback to load file on remote server for different projects
// TODO: resolve CORS or use CDN
export const fallbackSettingFilePath: string = 'https://enginoobz.com/dynamic-ui-framework/setting.html';
// export const settingFilePath: string = `/dynamic-ui-framework/setting.php`;
export enum StyleName { //  same as selectors in init SCSS
        Flat = 'flat-style',
        Neu = 'neu-style',
        Glass = 'glass-style',
        Nes = 'nes-style'
}
