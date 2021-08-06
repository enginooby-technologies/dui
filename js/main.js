import * as Ref from "./references.js";
import * as Loader from "./loader.js";
/* CUSTOM PROJECT-SPECIFIC JS*/
// dependent
// let dependentJquery
let settingPanelLoaded = false;
let settingButtonLoaded = false;
let $settingButton;
let $settingPanel;
// load required CSS
Loader.tryLoadStyleSheet(Ref.animateCss);
Loader.tryLoadStyleSheet(Ref.fontawesomeCss);
Loader.tryLoadStyleSheet(Ref.bootstrapMinCss);
// in case jquery is included manually
if (Loader.checkScriptIncludedOrIgnored(Ref.jqueryMinJs)) {
    loadSettingButton();
    // ADHOC: load other jquery-dependent scripts also
    Ref.popperMinJs.onload = () => Loader.tryLoadScript(Ref.bootstrapMinJs);
    Loader.tryLoadScript(Ref.popperMinJs);
}
// load required JS
Ref.jqueryMinJs.onload = () => {
    Loader.getDependencies('jquery').forEach(script => Loader.loadScript(script));
    Loader.tryLoadScript(Ref.popperMinJs);
    loadSettingButton();
}; // HTML/PHP loading dependent on jQuery
Ref.popperMinJs.onload = () => Loader.tryLoadScript(Ref.bootstrapMinJs);
Loader.tryLoadScript(Ref.jqueryMinJs);
// load option JS & CSS
Loader.tryLoadScript(Ref.prismCoreMinJs, () => {
    Loader.tryLoadScript(Ref.prismAutoloaderMinJs, () => {
        Loader.tryLoadStyleSheet(Ref.prismMinCss);
        if (Loader.checkScriptIncludedOrIgnored(Ref.prismAutoloaderMinJs)) {
            // @ts-ignore
            Prism.highlightAll(false, function () {
                console.log('[Prism] Syntax highlight completed');
            });
        }
    });
});
// defer loading setting button
function loadSettingButton() {
    // prevent loading multiple times
    if (settingButtonLoaded)
        return;
    settingButtonLoaded = true;
    console.log(">>> Loading Setting Button");
    Loader.loadFile(Ref.settingButtonFilePath)
        .done(onSettingButtonLoaded)
        .fail(() => Loader.loadFile(Ref.fallbackSettingButtonFilePath)
        .done(onSettingButtonLoaded));
}
function onSettingButtonLoaded() {
    // setup toggle event
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
    Loader.loadFile(Ref.settingFilePath)
        .done(onSettingPanelLoaded)
        .fail(() => Loader.loadFile(Ref.fallbackSettingFilePath)
        .done(onSettingPanelLoaded));
}
function onSettingPanelLoaded() {
    settingPanelLoaded = true;
    $settingPanel = $("#setting-section .setting-panel");
    // lazy loading main framework script
    Ref.dynamicUIJs.onerror = () => Loader.tryLoadScript(Ref.fallbackDynamicUIJs);
    Loader.tryLoadScript(Ref.dynamicUIJs);
    // lazy loading dependencies
    Loader.tryLoadScript(Ref.tinyColorMinJs);
    // ADHOC: add a delay to hide setting content init process
    setTimeout(() => {
        toggleSettingPanel();
    }, 50);
}
function toggleSettingPanel() {
    $settingPanel.toggleClass('show');
    $settingButton.toggleClass('active');
}
