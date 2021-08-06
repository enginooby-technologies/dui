
// @name is substring of src/href to check if the file is already included manually with <script/link>
//@triggerClasses are classes needed to appear in page for the file to be loaded 
//TODO: handle case where element with this class is loaded later into the page
export interface ScripFile {
        name: string;
        src: string,
        isModule?: boolean;
        integrity?: string;
        onload?: () => void;
        onerror?: () => void;
        triggerClasses?: string[],
}
export interface StyleSheetFile {
        name: string;
        href: string,
        integrity?: string,
        triggerClasses?: string[],
}

/* FRAMEWORK  */
const localFrameworkPath: string = '/dynamic-ui-framework';
// remote paths: ad-hoc fallback to load file on remote server for different projects
// TODO: resolve CORS or use CDN
const remoteFrameworkPath: string = 'https://enginoobz.com/dynamic-ui-framework';
export const settingFilePath: string = `${localFrameworkPath}/setting.html`;
export const fallbackSettingFilePath: string = `${remoteFrameworkPath}/setting.html`;
export const settingButtonFilePath: string = `${localFrameworkPath}/setting-button.html`;
export const fallbackSettingButtonFilePath: string = `${remoteFrameworkPath}/setting-button.html`;
export const dynamicUIJs: ScripFile = {
        name: "DynamicUI.js",
        src: `${localFrameworkPath}/js/DynamicUI.js`,
        isModule: true,
}
export const fallbackDynamicUIJs: ScripFile = {
        name: "DynamicUI.js",
        src: `${remoteFrameworkPath}/js/DynamicUI.js`,
        isModule: true,
}

/* DEPENDENCIES */
// required CSS
export const animateCss: StyleSheetFile = {
        name: "animate.min.css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        // triggerClasses: ["animate__animated"]
};
export const bootstrapMinCss: StyleSheetFile = {
        name: "bootstrap.min.css",
        href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        integrity: "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
}
export const fontawesomeCss: StyleSheetFile = {
        name: "fontawesome",
        href: "https://use.fontawesome.com/releases/v5.15.0/css/all.css",
        // triggerClasses: ["fa", "fab", "fas"]
}

// required JS
const jqueryMinJs: ScripFile = {
        name: "jquery",
        src: "https://code.jquery.com/jquery-3.6.0.min.js",
        integrity: "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
}
const popperMinJs: ScripFile = {
        name: "popper.min.js",
        src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
        integrity: "sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
}
const bootstrapMinJs: ScripFile = {
        name: "bootstrap.min.js",
        src: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
        integrity: "sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
}
const tinyColorMinJs: ScripFile = {
        name: "tinycolor.min.js",
        src: "https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.2/tinycolor.min.js",
        integrity: "sha512-+aXA9mgbUvFe0ToTlbt8/3vT7+nOgUmFw29wfFCsGoh8AZMRSU0p4WtOvC1vkF2JBrndPN2TuNZsHPAKPPxe8Q=="
}
//optional
const prismCoreMinJs: ScripFile = {
        name: "prism-core.min.js",
        src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-core.min.js",
        integrity: "sha512-hM0R3pW9UdoNG9T+oIW5pG9ndvy3OKChFfVTKzjyxNW9xrt6vAbD3OeFWdSLQ8mjKSgd9dSO3RXn3tojQtiA8Q==",
        triggerClasses: ["code-block"]
}
const prismAutoloaderMinJs: ScripFile = {
        name: "prism-autoloader.min.js",
        src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/autoloader/prism-autoloader.min.js",
        integrity: "sha512-xCfKr8zIONbip3Q1XG/u5x40hoJ0/DtP1bxyMEi0GWzUFoUffE+Dfw1Br8j55RRt9qG7bGKsh+4tSb1CvFHPSA==",
        triggerClasses: ["code-block"]
}
const prismMinCss: StyleSheetFile = {
        name: "prism.min.css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css",
        integrity: "sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ==",
        triggerClasses: ["code-block"]
}

/* CUSTOM PROJECT-SPECIFIC JS*/
// dependent
// let dependentJquery

const scripts = document.getElementsByTagName("script");
const links = document.getElementsByTagName("link");
let settingPanelLoaded: boolean = false;
let settingButtonLoaded: boolean = false;
let $settingButton: JQuery<HTMLElement>;
let $settingPanel: JQuery<HTMLElement>;

tryLoadStyleSheet(animateCss);
tryLoadStyleSheet(fontawesomeCss);
tryLoadStyleSheet(bootstrapMinCss);

// in case jquery is included manually
// TODO: load other jquery-dependent scripts also
if (isScriptIncludedOrIgnored(jqueryMinJs)) loadSettingButton();

// defer loading dependencies (required)
jqueryMinJs.onload = () => { tryLoadScript(popperMinJs); loadSettingButton() } // HTML/PHP loading dependent on jQuery
popperMinJs.onload = () => tryLoadScript(bootstrapMinJs);
tryLoadScript(jqueryMinJs)

// defer loading dependencies (optional)
tryLoadStyleSheet(prismMinCss);
tryLoadScript(prismCoreMinJs);
tryLoadScript(prismAutoloaderMinJs);

// defer loading setting button
function loadSettingButton() {
        // prevent loading multiple times
        if (settingButtonLoaded) return;
        settingButtonLoaded = true;

        console.log(">>> Loading Setting Button")
        loadFile(settingButtonFilePath)
                .done(setupButtonEvent)
                .fail(() => loadFile(fallbackSettingButtonFilePath)
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
