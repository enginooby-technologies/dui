export const settingFilePath = `/dynamic-ui-framework/setting.html`;
// ad-hoc fallback to load file on remote server for different projects
// TODO: resolve CORS or use CDN
export const fallbackSettingFilePath = 'https://enginoobz.com/dynamic-ui-framework/setting.html';
// export const settingFilePath: string = `/dynamic-ui-framework/setting.php`;
export var StyleName;
(function (StyleName) {
    StyleName["Flat"] = "flat-style";
    StyleName["Neu"] = "neu-style";
    StyleName["Glass"] = "glass-style";
    StyleName["Nes"] = "nes-style";
    StyleName["Win98"] = "win98-style";
})(StyleName || (StyleName = {}));
