import * as Ref from "./references.js";
/* CUSTOM PROJECT-SPECIFIC JS*/
// dependent
// let dependentJquery
const scripts = document.getElementsByTagName("script");
const links = document.getElementsByTagName("link");
let settingPanelLoaded = false;
let settingButtonLoaded = false;
let $settingButton;
let $settingPanel;
tryLoadStyleSheet(Ref.animateCss);
tryLoadStyleSheet(Ref.fontawesomeCss);
tryLoadStyleSheet(Ref.bootstrapMinCss);
// in case jquery is included manually
// TODO: load other jquery-dependent scripts also
if (isScriptIncludedOrIgnored(Ref.jqueryMinJs))
    loadSettingButton();
// defer loading dependencies (required)
Ref.jqueryMinJs.onload = () => { tryLoadScript(Ref.popperMinJs); loadSettingButton(); }; // HTML/PHP loading dependent on jQuery
Ref.popperMinJs.onload = () => tryLoadScript(Ref.bootstrapMinJs);
tryLoadScript(Ref.jqueryMinJs);
// defer loading dependencies (optional)
tryLoadStyleSheet(Ref.prismMinCss);
tryLoadScript(Ref.prismCoreMinJs);
tryLoadScript(Ref.prismAutoloaderMinJs);
// defer loading setting button
function loadSettingButton() {
    // prevent loading multiple times
    if (settingButtonLoaded)
        return;
    settingButtonLoaded = true;
    console.log(">>> Loading Setting Button");
    loadFile(Ref.settingButtonFilePath)
        .done(setupButtonEvent)
        .fail(() => loadFile(Ref.fallbackSettingButtonFilePath)
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
    loadFile(Ref.settingFilePath)
        .done(onSettingPanelLoaded)
        .fail(() => loadFile(Ref.fallbackSettingFilePath)
        .done(onSettingPanelLoaded));
}
function onSettingPanelLoaded() {
    settingPanelLoaded = true;
    $settingPanel = $("#setting-section .setting-panel");
    toggleSettingPanel();
    // lazy loading main framework script
    Ref.dynamicUIJs.onerror = () => tryLoadScript(Ref.fallbackDynamicUIJs);
    tryLoadScript(Ref.dynamicUIJs);
    // lazy loading dependencies
    tryLoadScript(Ref.tinyColorMinJs);
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
