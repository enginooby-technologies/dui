import * as Ref from "./references.js";
import * as Loader from "./loader.js"

/* CUSTOM PROJECT-SPECIFIC JS*/
// dependent
// let dependentJquery

let settingPanelLoaded: boolean = false;
let settingButtonLoaded: boolean = false;
let $settingButton: JQuery<HTMLElement>;
let $settingPanel: JQuery<HTMLElement>;

// load required CSS
Loader.tryLoadStyleSheet(Ref.animateCss);
Loader.tryLoadStyleSheet(Ref.fontawesomeCss);
Loader.tryLoadStyleSheet(Ref.bootstrapMinCss);

// in case jquery is included manually
// TODO: load other jquery-dependent scripts also
if (Loader.checkScriptIncludedOrIgnored(Ref.jqueryMinJs)) loadSettingButton();

// load required JS
Ref.jqueryMinJs.onload = () => { Loader.tryLoadScript(Ref.popperMinJs); loadSettingButton() } // HTML/PHP loading dependent on jQuery
Ref.popperMinJs.onload = () => Loader.tryLoadScript(Ref.bootstrapMinJs);
Loader.tryLoadScript(Ref.jqueryMinJs)

// load option JS & CSS
Loader.tryLoadStyleSheet(Ref.prismMinCss);
Loader.tryLoadScript(Ref.prismCoreMinJs);
Loader.tryLoadScript(Ref.prismAutoloaderMinJs);

// defer loading setting button
function loadSettingButton() {
        // prevent loading multiple times
        if (settingButtonLoaded) return;
        settingButtonLoaded = true;

        console.log(">>> Loading Setting Button")
        Loader.loadFile(Ref.settingButtonFilePath)!
                .done(onSettingButtonLoaded)
                .fail(() => Loader.loadFile(Ref.fallbackSettingButtonFilePath)!
                        .done(onSettingButtonLoaded));
}

function onSettingButtonLoaded() {
        // setup toggle event
        $settingButton = $(" .setting-button-border");
        $settingButton.on('click', function () {
                // lazy loading setting panel
                if (!settingPanelLoaded) loadSettingPanel();
                else toggleSettingPanel();
        });
}

function loadSettingPanel() {
        Loader.loadFile(Ref.settingFilePath)!
                .done(onSettingPanelLoaded)
                .fail(() => Loader.loadFile(Ref.fallbackSettingFilePath)!
                        .done(onSettingPanelLoaded));
}

function onSettingPanelLoaded() {
        settingPanelLoaded = true;
        $settingPanel = $("#setting-section .setting-panel");
        toggleSettingPanel();
        // lazy loading main framework script
        Ref.dynamicUIJs.onerror = () => Loader.tryLoadScript(Ref.fallbackDynamicUIJs);
        Loader.tryLoadScript(Ref.dynamicUIJs);
        // lazy loading dependencies
        Loader.tryLoadScript(Ref.tinyColorMinJs);
}

function toggleSettingPanel() {
        $settingPanel.toggleClass('show');
        $settingButton.toggleClass('active');
}


