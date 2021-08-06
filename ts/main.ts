import * as Ref from "./references.js";
import * as Loader from "./loader.js"

let settingPanelLoaded: boolean = false;
let settingButtonLoaded: boolean = false;
let $settingButton: JQuery<HTMLElement>;
let $settingPanel: JQuery<HTMLElement>;

// load required CSS
Loader.tryLoadStyleSheet(Ref.animateCss);
Loader.tryLoadStyleSheet(Ref.fontawesomeCss);
Loader.tryLoadStyleSheet(Ref.bootstrapMinCss);

// load required JS
Loader.tryLoadScript(Ref.jqueryMinJs, () => {
        loadSettingButton(); // HTML/PHP loading dependent on jQuery
        Loader.tryLoadScript(Ref.popperMinJs, () => {
                Loader.tryLoadScript(Ref.bootstrapMinJs)
        })
})

// load option JS & CSS
Loader.tryLoadScript(Ref.prismCoreMinJs, () => {
        Loader.tryLoadScript(Ref.prismAutoloaderMinJs, () => {
                Loader.tryLoadStyleSheet(Ref.prismMinCss);
                if (Loader.checkScriptIncludedOrIgnored(Ref.prismAutoloaderMinJs)) {
                        // @ts-ignore
                        Prism.highlightAll(false, function () { });
                }
        });
});

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
        // lazy loading main framework script
        Ref.dynamicUIJs.onerror = () => Loader.tryLoadScript(Ref.fallbackDynamicUIJs);
        Loader.tryLoadScript(Ref.dynamicUIJs);
        // lazy loading dependencies
        Loader.tryLoadScript(Ref.tinyColorMinJs);
        // ADHOC: add a delay to hide setting content init process
        setTimeout(() => {
                toggleSettingPanel();
        }, 50)
}

function toggleSettingPanel() {
        $settingPanel.toggleClass('show');
        $settingButton.toggleClass('active');
}


