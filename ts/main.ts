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
const tinyColorMinJs = "https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.2/tinycolor.min.js";
const tinyColorMinJsIntegrity = "sha512-+aXA9mgbUvFe0ToTlbt8/3vT7+nOgUmFw29wfFCsGoh8AZMRSU0p4WtOvC1vkF2JBrndPN2TuNZsHPAKPPxe8Q==";
const prismCoreMinJs = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-core.min.js";
const prismCoreMinJsIntegrity = "sha512-hM0R3pW9UdoNG9T+oIW5pG9ndvy3OKChFfVTKzjyxNW9xrt6vAbD3OeFWdSLQ8mjKSgd9dSO3RXn3tojQtiA8Q=="
const prismAutoloaderMinJs = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/autoloader/prism-autoloader.min.js";
const prismAutoloaderMinJsIntegrity = "sha512-xCfKr8zIONbip3Q1XG/u5x40hoJ0/DtP1bxyMEi0GWzUFoUffE+Dfw1Br8j55RRt9qG7bGKsh+4tSb1CvFHPSA==";
const prismMinCss = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css";
const prismMinCssIntegrity = "sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ=="

let settingPanelLoaded: boolean = false;
let $settingButton: JQuery<HTMLElement>;
let $settingPanel: JQuery<HTMLElement>;

// defer loading setting button
loadFile(settingButtonFilePath)
        .done(setupButtonEvent)
        .fail(() => loadFile(fallbackSettingButtonFilePath)
                .done(setupButtonEvent));

// defer loading dependencies
// only load Prism if Code block component is used in page
if (document.querySelector('.code-block')) {
        if (!isStyleSheetAlreadyIncluded('prism.min.css')) loadStyleSheet(prismMinCss, prismMinCssIntegrity);
        // TODO: manually activate Prism to highlight code after load
        if (!isScriptAlreadyIncluded('prism-core.min.js')) loadScript(prismCoreMinJs, prismCoreMinJsIntegrity);
        if (!isScriptAlreadyIncluded('prism-autoloader.min.js')) loadScript(prismAutoloaderMinJs, prismAutoloaderMinJsIntegrity);
}

function loadFile(filePath: string) {
        return $.get(filePath, function (data) {
                $('body').append(data);
        })
}

function isScriptAlreadyIncluded(scriptName: string) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++)
                if (scripts[i].getAttribute('src')?.includes(scriptName)) return true;
        return false;
}

function isStyleSheetAlreadyIncluded(sheetName: string) {
        var scripts = document.getElementsByTagName("link");
        for (var i = 0; i < scripts.length; i++)
                if (scripts[i].getAttribute('href')?.includes(sheetName)) return true;
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
