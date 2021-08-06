/* FRAMEWORK RESOURCES FOR LAZY LOADING */
const localFrameworkPath: string = '/dynamic-ui-framework';
const remoteFrameworkPath: string = 'https://enginoobz.com/dynamic-ui-framework';
// local paths
const settingFilePath: string = `${localFrameworkPath}/setting.html`;
const settingButtonFilePath: string = `${localFrameworkPath}/setting-button.html`;
const dynamicUIFilePath: string = `${localFrameworkPath}/js/DynamicUI.js`;
// remote paths: ad-hoc fallback to load file on remote server for different projects
// TODO: resolve CORS or use CDN
const fallbackSettingFilePath: string = `${remoteFrameworkPath}/setting.html`;
const fallbackSettingButtonFilePath: string = `${remoteFrameworkPath}/setting-button.html`;
const fallbackDynamicUIFilePath: string = `${remoteFrameworkPath}/js/DynamicUI.js`;

// @name is substring of src/href to check if the file is already included manually with <script/link>
//@triggerClasses are classes needed to appear in page for the file to be loaded 
//TODO: handle case where element with this class is loaded later into the page
interface ScripFile {
        name: string;
        src: string,
        isModule?: boolean;
        integrity?: string;
        onload?: () => void;
        onerror?: () => void;
        triggerClasses?: string[],
}
interface StyleSheetFile {
        name: string;
        href: string,
        integrity?: string,
        triggerClasses?: string[],
}

/* DEPENDENCIES */
// required CSS
const animateCss: StyleSheetFile = {
        name: "animate.min.css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        // triggerClasses: ["animate__animated"]
};
const bootstrapMinCss: StyleSheetFile = {
        name: "bootstrap.min.css",
        href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        integrity: "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
}
const fontawesomeCss: StyleSheetFile = {
        name: "fontawesome",
        href: "https://use.fontawesome.com/releases/v5.15.0/css/all.css",
        triggerClasses: ["fa", "fab", "fas"]
}
// required JS
const jqueryMinJs = "https://code.jquery.com/jquery-3.6.0.min.js";
const jqueryMinJsIntegrity = "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=";
const popperMinJs = "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js";
const popperMinJsIntegrity = "sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo";
const bootstrapMinJs = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js";
const bootstrapMinJsIntegrity = "sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM";
//optional
const tinyColorMinJs = "https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.2/tinycolor.min.js";
const tinyColorMinJsIntegrity = "sha512-+aXA9mgbUvFe0ToTlbt8/3vT7+nOgUmFw29wfFCsGoh8AZMRSU0p4WtOvC1vkF2JBrndPN2TuNZsHPAKPPxe8Q==";
const prismCoreMinJs = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-core.min.js";
const prismCoreMinJsIntegrity = "sha512-hM0R3pW9UdoNG9T+oIW5pG9ndvy3OKChFfVTKzjyxNW9xrt6vAbD3OeFWdSLQ8mjKSgd9dSO3RXn3tojQtiA8Q=="
const prismAutoloaderMinJs = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/autoloader/prism-autoloader.min.js";
const prismAutoloaderMinJsIntegrity = "sha512-xCfKr8zIONbip3Q1XG/u5x40hoJ0/DtP1bxyMEi0GWzUFoUffE+Dfw1Br8j55RRt9qG7bGKsh+4tSb1CvFHPSA==";
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
let $settingButton: JQuery<HTMLElement>;
let $settingPanel: JQuery<HTMLElement>;

tryLoadStyleSheet(animateCss);
tryLoadStyleSheet(fontawesomeCss);
tryLoadStyleSheet(bootstrapMinCss);

// defer loading dependencies (required)
if (!isScriptIncludedOrIgnored('jquery')) {
        loadScript(jqueryMinJs, jqueryMinJsIntegrity, undefined, () => {
                loadScript(popperMinJs, popperMinJsIntegrity, undefined, () => {
                        loadScript(bootstrapMinJs, bootstrapMinJsIntegrity, undefined, loadSettingButton)
                })
        })
} else loadSettingButton();

// defer loading dependencies (optional)
tryLoadStyleSheet(prismMinCss);
if (document.querySelector('.code-block')) {
        // TODO: manually activate Prism to highlight code after load
        if (!isScriptIncludedOrIgnored('prism-core.min.js'))
                loadScript(prismCoreMinJs, prismCoreMinJsIntegrity);
        if (!isScriptIncludedOrIgnored('prism-autoloader.min.js'))
                loadScript(prismAutoloaderMinJs, prismAutoloaderMinJsIntegrity);
}

// defer loading setting button
function loadSettingButton() {
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
function isScriptIncludedOrIgnored(scriptName: string) {
        for (var i = 0; i < scripts.length; i++)
                if (scripts[i].getAttribute('src')?.includes(scriptName)
                        ||
                        scripts[i].getAttribute('data-ignore')?.includes(scriptName))
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
        // lazy loading main framework script
        loadScript(dynamicUIFilePath, undefined, true, toggleSettingPanel, () => {
                loadScript(fallbackDynamicUIFilePath, undefined, true, toggleSettingPanel)
        });
        // lazy loading dependencies
        loadScript(tinyColorMinJs, tinyColorMinJsIntegrity);
}

function toggleSettingPanel() {
        $settingPanel.toggleClass('show');
        $settingButton.toggleClass('active');
}

function loadScript(src: string, integrity?: string, isModule?: boolean, onload?: () => void, onerror?: () => void) {
        const script: HTMLScriptElement = document.createElement('script');
        if (onerror) script.onerror = onerror;
        if (onload) script.onload = onload;
        script.src = src;
        if (isModule) script.type = "module";
        if (integrity) {
                script.integrity = integrity;
                script.crossOrigin = "anonymous";
                script.referrerPolicy = "no-referrer";
        }
        document.head.appendChild(script);
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
