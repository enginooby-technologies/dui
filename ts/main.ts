import * as Ref from "./references.js"
import { ScripFile, StyleSheetFile } from "./references.js";

/* CUSTOM PROJECT-SPECIFIC JS*/
// dependent
// let dependentJquery

const scripts = document.getElementsByTagName("script");
const links = document.getElementsByTagName("link");
let settingPanelLoaded: boolean = false;
let settingButtonLoaded: boolean = false;
let $settingButton: JQuery<HTMLElement>;
let $settingPanel: JQuery<HTMLElement>;

tryLoadStyleSheet(Ref.animateCss);
tryLoadStyleSheet(Ref.fontawesomeCss);
tryLoadStyleSheet(Ref.bootstrapMinCss);

// in case jquery is included manually
// TODO: load other jquery-dependent scripts also
if (isScriptIncludedOrIgnored(Ref.jqueryMinJs)) loadSettingButton();

// defer loading dependencies (required)
Ref.jqueryMinJs.onload = () => { tryLoadScript(Ref.popperMinJs); loadSettingButton() } // HTML/PHP loading dependent on jQuery
Ref.popperMinJs.onload = () => tryLoadScript(Ref.bootstrapMinJs);
tryLoadScript(Ref.jqueryMinJs)

// defer loading dependencies (optional)
tryLoadStyleSheet(Ref.prismMinCss);
tryLoadScript(Ref.prismCoreMinJs);
tryLoadScript(Ref.prismAutoloaderMinJs);

// defer loading setting button
function loadSettingButton() {
        // prevent loading multiple times
        if (settingButtonLoaded) return;
        settingButtonLoaded = true;

        console.log(">>> Loading Setting Button")
        loadFile(Ref.settingButtonFilePath)
                .done(setupButtonEvent)
                .fail(() => loadFile(Ref.fallbackSettingButtonFilePath)
                        .done(setupButtonEvent));
}

function loadFile(filePath: string) {
        return $.get(filePath, function (data) {
                $('body').append(data);
        })
}

// to prevent framework from loading a script/style shet
// e.g., <script data-ignore="dont-load-prism-core.min.js-please "></script>
// REFACTOR
function isScriptIncludedOrIgnored(script: ScripFile) {
        for (var i = 0; i < scripts.length; i++)
                if (scripts[i].getAttribute('src')?.includes(script.name)
                        ||
                        scripts[i].getAttribute('data-ignore')?.includes(script.name))
                        return true;
        return false;
}

function isStyleSheetIncludedOrIgnored(sheet: StyleSheetFile) {
        for (var i = 0; i < links.length; i++)
                if (links[i].getAttribute('href')?.includes(sheet.name)
                        ||
                        links[i].getAttribute('data-ignore')?.includes(sheet.name))
                        return true;
        return false;
}

function setupButtonEvent() {
        $settingButton = $(" .setting-button-border");
        $settingButton.on('click', function () {
                // lazy loading setting panel
                if (!settingPanelLoaded) loadSettingPanel();
                else toggleSettingPanel();
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

function loadScript(script: ScripFile) {
        console.log(`>>> Loading ${script.name.toLocaleUpperCase()} from ${script.src}`);
        const scriptElement: HTMLScriptElement = document.createElement('script');
        if (script.onerror) scriptElement.onerror = script.onerror;
        if (script.onload) scriptElement.onload = script.onload;
        scriptElement.src = script.src;
        if (script.isModule) scriptElement.type = "module";
        if (script.integrity) {
                scriptElement.integrity = script.integrity;
                scriptElement.crossOrigin = "anonymous";
                scriptElement.referrerPolicy = "no-referrer";
        }
        document.head.appendChild(scriptElement);
}

// REFACTOR
function tryLoadScript(script: ScripFile) {
        let isFileNeeded: boolean = true;
        if (script.triggerClasses) {
                isFileNeeded = false;
                for (let className of script.triggerClasses) {
                        if (document.querySelector("." + className)) isFileNeeded = true;
                        break;
                }
        }
        script.triggerClasses?.forEach(className => { if (document.querySelector("." + className)) isFileNeeded = true; })
        if (isFileNeeded && !isScriptIncludedOrIgnored(script)) loadScript(script);
}

function tryLoadStyleSheet(sheet: StyleSheetFile) {
        let isFileNeeded: boolean = true;
        if (sheet.triggerClasses) {
                isFileNeeded = false;
                for (let className of sheet.triggerClasses) {
                        if (document.querySelector("." + className)) isFileNeeded = true;
                        break;
                }
        }
        sheet.triggerClasses?.forEach(className => { if (document.querySelector("." + className)) isFileNeeded = true; })
        if (isFileNeeded && !isStyleSheetIncludedOrIgnored(sheet)) loadStyleSheet(sheet);
}

function loadStyleSheet(sheet: StyleSheetFile) {
        console.log(`>>> Loading ${sheet.name.toLocaleUpperCase()} from ${sheet.href}`);
        const link: HTMLLinkElement = document.createElement('link');
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
