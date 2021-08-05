/* FRAMEWORK RESOURCES FOR LAZY LOADING */
const localFrameworkPath: string = '/dynamic-ui-framework';
const remoteFrameworkPath: string = 'https://enginoobz.com/dynamic-ui-framework';

const settingFilePath: string = `${localFrameworkPath}/setting.html`;
const settingButtonFilePath: string = `${localFrameworkPath}/setting-button.html`;
const dynamicUIFilePath: string = `${localFrameworkPath}/js/DynamicUI.js`;

// ad-hoc fallback to load file on remote server for different projects
// TODO: resolve CORS or use CDN
const fallbackSettingFilePath: string = `${remoteFrameworkPath}/setting.html`;
const fallbackSettingButtonFilePath: string = `${remoteFrameworkPath}/setting-button.html`;
const fallbackDynamicUIFilePath: string = `${remoteFrameworkPath}/js/DynamicUI.js`;

/* DEPENDENCIES */
// required CSS
const animateCss = "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
const fontawesomeCss = "https://use.fontawesome.com/releases/v5.15.0/css/all.css";
const bootstrapMinCss = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
const bootstrapMinCssIntegrity = "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T";
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
const prismMinCss = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css";
const prismMinCssIntegrity = "sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ=="

const scripts = document.getElementsByTagName("script");
const links = document.getElementsByTagName("link");
let settingPanelLoaded: boolean = false;
let $settingButton: JQuery<HTMLElement>;
let $settingPanel: JQuery<HTMLElement>;

// only load CSS if its class is used in page
// CAUTION: handle case where element with this class is loaded later into the page
// if (document.querySelector('.animate__animated'))
if (!isStyleSheetAlreadyIncluded('animate.css')) loadStyleSheet(animateCss);
// if (document.querySelector('.fa') || document.querySelector('.fas'))
if (!isStyleSheetAlreadyIncluded('fontawesome.css')) loadStyleSheet(fontawesomeCss);
if (!isStyleSheetAlreadyIncluded('bootstrap.min.css')) loadStyleSheet(bootstrapMinCss, bootstrapMinCssIntegrity);

// defer loading dependencies (required)
if (!isScriptAlreadyIncluded('jquery')) {
        loadScript(jqueryMinJs, jqueryMinJsIntegrity, undefined, () => {
                loadScript(popperMinJs, popperMinJsIntegrity, undefined, () => {
                        loadScript(bootstrapMinJs, bootstrapMinJsIntegrity, undefined, loadSettingButton)
                })
        })
} else loadSettingButton();

// defer loading dependencies (optional)
// only load Prism if Code block component is used in page
if (document.querySelector('.code-block')) {
        if (!isStyleSheetAlreadyIncluded('prism.min.css')) loadStyleSheet(prismMinCss, prismMinCssIntegrity);
        // TODO: manually activate Prism to highlight code after load
        if (!isScriptAlreadyIncluded('prism-core.min.js')) loadScript(prismCoreMinJs, prismCoreMinJsIntegrity);
        if (!isScriptAlreadyIncluded('prism-autoloader.min.js')) loadScript(prismAutoloaderMinJs, prismAutoloaderMinJsIntegrity);
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

// to prevent framework from loading a script/sheet, add a fake tag including the name file of the resource 
// e.g., <script async src="dont-load-prism-core.min.js-please "></script>
function isScriptAlreadyIncluded(scriptName: string) {
        for (var i = 0; i < scripts.length; i++)
                if (scripts[i].getAttribute('src')?.includes(scriptName)) return true;
        return false;
}

function isStyleSheetAlreadyIncluded(sheetName: string) {
        for (var i = 0; i < links.length; i++)
                if (links[i].getAttribute('href')?.includes(sheetName)) return true;
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

function loadStyleSheet(href: string, integrity?: string) {
        const link: HTMLLinkElement = document.createElement('link');
        link.href = href;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        if (integrity) {
                link.integrity = integrity;
                link.crossOrigin = "anonymous";
                link.referrerPolicy = "no-referrer";
        }
        // load the sheet on top of head to avoid overriding framework sheet
        document.head.insertBefore(link, document.getElementsByTagName("head")[0].firstChild);
}
