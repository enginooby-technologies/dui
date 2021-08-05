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
const tinyColorJs = "https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.2/tinycolor.min.js";
const tinyColorJsIntegrity = "sha512-+aXA9mgbUvFe0ToTlbt8/3vT7+nOgUmFw29wfFCsGoh8AZMRSU0p4WtOvC1vkF2JBrndPN2TuNZsHPAKPPxe8Q==";

let settingPanelLoaded: boolean = false;
let $settingButton: JQuery<HTMLElement>;
let $settingPanel: JQuery<HTMLElement>;

// lazy loading setting button
loadFile(settingButtonFilePath)
        .done(setupButtonEvent)
        .fail(() => loadFile(fallbackSettingButtonFilePath)
                .done(setupButtonEvent));

function loadFile(filePath: string) {
        return $.get(filePath, function (data) {
                $('body').append(data);
        })
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
        loadScript(dynamicUIFilePath, true, toggleSettingPanel, () => {
                loadScript(fallbackDynamicUIFilePath, true, toggleSettingPanel,)
        });
        // lazy loading dependencies
        loadScript(tinyColorJs, false, undefined, undefined, tinyColorJsIntegrity);
}

function toggleSettingPanel() {
        $settingPanel.toggleClass('show');
        $settingButton.toggleClass('active');
}

function loadScript(src: string, isModule: boolean, onload?: () => void, onerror?: () => void, integrity?: string) {
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
