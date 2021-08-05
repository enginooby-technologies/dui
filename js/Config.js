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
export const interactJs = {
    src: "https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"
};
export const webfontJs = {
    src: "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
};
export const tinyColorJs = {
    src: "https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.2/tinycolor.min.js",
    integrity: "sha512-+aXA9mgbUvFe0ToTlbt8/3vT7+nOgUmFw29wfFCsGoh8AZMRSU0p4WtOvC1vkF2JBrndPN2TuNZsHPAKPPxe8Q==",
    crossOrigin: "anonymous",
    referrerPolicy: "no-referrer"
};
