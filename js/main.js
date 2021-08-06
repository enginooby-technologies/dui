/* FRAMEWORK  */
const localFrameworkPath = '/dynamic-ui-framework';
// remote paths: ad-hoc fallback to load file on remote server for different projects
// TODO: resolve CORS or use CDN
const remoteFrameworkPath = 'https://enginoobz.com/dynamic-ui-framework';
export const settingFilePath = `${localFrameworkPath}/setting.html`;
export const fallbackSettingFilePath = `${remoteFrameworkPath}/setting.html`;
export const settingButtonFilePath = `${localFrameworkPath}/setting-button.html`;
export const fallbackSettingButtonFilePath = `${remoteFrameworkPath}/setting-button.html`;
export const dynamicUIJs = {
    name: "DynamicUI.js",
    src: `${localFrameworkPath}/js/DynamicUI.js`,
    isModule: true,
};
export const fallbackDynamicUIJs = {
    name: "DynamicUI.js",
    src: `${remoteFrameworkPath}/js/DynamicUI.js`,
    isModule: true,
};
/* DEPENDENCIES */
// required CSS
export const animateCss = {
    name: "animate.min.css",
    href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
    // triggerClasses: ["animate__animated"]
};
export const bootstrapMinCss = {
    name: "bootstrap.min.css",
    href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
    integrity: "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
};
export const fontawesomeCss = {
    name: "fontawesome",
    href: "https://use.fontawesome.com/releases/v5.15.0/css/all.css",
    // triggerClasses: ["fa", "fab", "fas"]
};
// required JS
const jqueryMinJs = {
    name: "jquery",
    src: "https://code.jquery.com/jquery-3.6.0.min.js",
    integrity: "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
};
const popperMinJs = {
    name: "popper.min.js",
    src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
    integrity: "sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
};
const bootstrapMinJs = {
    name: "bootstrap.min.js",
    src: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
    integrity: "sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
};
const tinyColorMinJs = {
    name: "tinycolor.min.js",
    src: "https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.2/tinycolor.min.js",
    integrity: "sha512-+aXA9mgbUvFe0ToTlbt8/3vT7+nOgUmFw29wfFCsGoh8AZMRSU0p4WtOvC1vkF2JBrndPN2TuNZsHPAKPPxe8Q=="
};
//optional
const prismCoreMinJs = {
    name: "prism-core.min.js",
    src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-core.min.js",
    integrity: "sha512-hM0R3pW9UdoNG9T+oIW5pG9ndvy3OKChFfVTKzjyxNW9xrt6vAbD3OeFWdSLQ8mjKSgd9dSO3RXn3tojQtiA8Q==",
    triggerClasses: ["code-block"]
};
const prismAutoloaderMinJs = {
    name: "prism-autoloader.min.js",
    src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/autoloader/prism-autoloader.min.js",
    integrity: "sha512-xCfKr8zIONbip3Q1XG/u5x40hoJ0/DtP1bxyMEi0GWzUFoUffE+Dfw1Br8j55RRt9qG7bGKsh+4tSb1CvFHPSA==",
    triggerClasses: ["code-block"]
};
const prismMinCss = {
    name: "prism.min.css",
    href: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css",
    integrity: "sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ==",
    triggerClasses: ["code-block"]
};
/* CUSTOM PROJECT-SPECIFIC JS*/
// dependent
// let dependentJquery
const scripts = document.getElementsByTagName("script");
const links = document.getElementsByTagName("link");
let settingPanelLoaded = false;
let settingButtonLoaded = false;
let $settingButton;
let $settingPanel;
tryLoadStyleSheet(animateCss);
tryLoadStyleSheet(fontawesomeCss);
tryLoadStyleSheet(bootstrapMinCss);
// in case jquery is included manually
// TODO: load other jquery-dependent scripts also
if (isScriptIncludedOrIgnored(jqueryMinJs))
    loadSettingButton();
// defer loading dependencies (required)
jqueryMinJs.onload = () => { tryLoadScript(popperMinJs); loadSettingButton(); }; // HTML/PHP loading dependent on jQuery
popperMinJs.onload = () => tryLoadScript(bootstrapMinJs);
tryLoadScript(jqueryMinJs);
// defer loading dependencies (optional)
tryLoadStyleSheet(prismMinCss);
tryLoadScript(prismCoreMinJs);
tryLoadScript(prismAutoloaderMinJs);
// defer loading setting button
function loadSettingButton() {
    // prevent loading multiple times
    if (settingButtonLoaded)
        return;
    settingButtonLoaded = true;
    console.log(">>> Loading Setting Button");
    loadFile(settingButtonFilePath)
        .done(setupButtonEvent)
        .fail(() => loadFile(fallbackSettingButtonFilePath)
        .done(setupButtonEvent));
}
function loadFile(filePath) {
    return $.get(filePath, function (data) {
        $('body').append(data);
    });
}
// to prevent framework from loading a script/style shet
// e.g., <script data-ignore="dont-load-prism-core.min.js-please "></script>
// REFACTOR
function isScriptIncludedOrIgnored(script) {
    var _a, _b;
    for (var i = 0; i < scripts.length; i++)
        if (((_a = scripts[i].getAttribute('src')) === null || _a === void 0 ? void 0 : _a.includes(script.name))
            ||
                ((_b = scripts[i].getAttribute('data-ignore')) === null || _b === void 0 ? void 0 : _b.includes(script.name)))
            return true;
    return false;
}
function isStyleSheetIncludedOrIgnored(sheet) {
    var _a, _b;
    for (var i = 0; i < links.length; i++)
        if (((_a = links[i].getAttribute('href')) === null || _a === void 0 ? void 0 : _a.includes(sheet.name))
            ||
                ((_b = links[i].getAttribute('data-ignore')) === null || _b === void 0 ? void 0 : _b.includes(sheet.name)))
            return true;
    return false;
}
function setupButtonEvent() {
    $settingButton = $(" .setting-button-border");
    $settingButton.on('click', function () {
        // lazy loading setting panel
        if (!settingPanelLoaded)
            loadSettingPanel();
        else
            toggleSettingPanel();
    });
}
function loadSettingPanel() {
    loadFile(settingFilePath)
        .done(onSettingPanelLoaded)
        .fail(() => loadFile(fallbackSettingFilePath)
        .done(onSettingPanelLoaded));
}
function onSettingPanelLoaded() {
    settingPanelLoaded = true;
    $settingPanel = $("#setting-section .setting-panel");
    toggleSettingPanel();
    // lazy loading main framework script
    dynamicUIJs.onerror = () => tryLoadScript(fallbackDynamicUIJs);
    tryLoadScript(dynamicUIJs);
    // lazy loading dependencies
    tryLoadScript(tinyColorMinJs);
}
function toggleSettingPanel() {
    $settingPanel.toggleClass('show');
    $settingButton.toggleClass('active');
}
function loadScript(script) {
    console.log(`>>> Loading ${script.name.toLocaleUpperCase()} from ${script.src}`);
    const scriptElement = document.createElement('script');
    if (script.onerror)
        scriptElement.onerror = script.onerror;
    if (script.onload)
        scriptElement.onload = script.onload;
    scriptElement.src = script.src;
    if (script.isModule)
        scriptElement.type = "module";
    if (script.integrity) {
        scriptElement.integrity = script.integrity;
        scriptElement.crossOrigin = "anonymous";
        scriptElement.referrerPolicy = "no-referrer";
    }
    document.head.appendChild(scriptElement);
}
// REFACTOR
function tryLoadScript(script) {
    var _a;
    let isFileNeeded = true;
    if (script.triggerClasses) {
        isFileNeeded = false;
        for (let className of script.triggerClasses) {
            if (document.querySelector("." + className))
                isFileNeeded = true;
            break;
        }
    }
    (_a = script.triggerClasses) === null || _a === void 0 ? void 0 : _a.forEach(className => { if (document.querySelector("." + className))
        isFileNeeded = true; });
    if (isFileNeeded && !isScriptIncludedOrIgnored(script))
        loadScript(script);
}
function tryLoadStyleSheet(sheet) {
    var _a;
    let isFileNeeded = true;
    if (sheet.triggerClasses) {
        isFileNeeded = false;
        for (let className of sheet.triggerClasses) {
            if (document.querySelector("." + className))
                isFileNeeded = true;
            break;
        }
    }
    (_a = sheet.triggerClasses) === null || _a === void 0 ? void 0 : _a.forEach(className => { if (document.querySelector("." + className))
        isFileNeeded = true; });
    if (isFileNeeded && !isStyleSheetIncludedOrIgnored(sheet))
        loadStyleSheet(sheet);
}
function loadStyleSheet(sheet) {
    console.log(`>>> Loading ${sheet.name.toLocaleUpperCase()} from ${sheet.href}`);
    const link = document.createElement('link');
    link.href = sheet.href;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    if (sheet.integrity) {
        link.integrity = sheet.integrity;
        link.crossOrigin = "anonymous";
        link.referrerPolicy = "no-referrer";
    }
    // load the sheet on top of head to avoid overriding framework sheet
    document.head.insertBefore(link, document.getElementsByTagName("head")[0].firstChild);
}
