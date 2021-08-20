import * as Ref from "./references.js";
import { checkScriptIncludedOrIgnored, loadFile, tryLoadScript, tryLoadStyleSheet } from "./loader.js";
let settingPanelLoaded = false;
let settingButtonLoaded = false;
let $settingButton;
let $settingPanel;
// load required CSS
tryLoadStyleSheet(Ref.animateCss);
tryLoadStyleSheet(Ref.fontawesomeCss);
tryLoadStyleSheet(Ref.bootstrap5MinCss);
// load required JS
tryLoadScript(Ref.jqueryMinJs, () => {
  loadSettingButton(); // HTML/PHP loading dependent on jQuery
  // tryLoadScript(Ref.popperMinJs, () => { // already included in Bootstrap bundle JS
  tryLoadScript(Ref.bootstrap5MinBundleJs);
  // })
});
// REFACTOR: async-await
// load option JS & CSS
tryLoadScript(Ref.prismCoreMinJs, () => {
  tryLoadScript(Ref.prismAutoloaderMinJs, () => {
    tryLoadStyleSheet(Ref.prismMinCss);
    if (checkScriptIncludedOrIgnored(Ref.prismAutoloaderMinJs)) {
      // @ts-ignore
      Prism.highlightAll(false, function () { });
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
  loadFile(Ref.settingButtonFilePath)
    .done(onSettingButtonLoaded)
    .fail(() => loadFile(Ref.fallbackSettingButtonFilePath)
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
  loadFile(Ref.settingFilePath)
    .done(onSettingPanelLoaded)
    .fail(() => loadFile(Ref.fallbackSettingFilePath)
      .done(onSettingPanelLoaded));
}
function onSettingPanelLoaded() {
  settingPanelLoaded = true;
  $settingPanel = $("#setting-section .setting-panel");
  // lazy loading main framework script
  Ref.dynamicUIJs.onerror = () => tryLoadScript(Ref.fallbackDynamicUIJs);
  tryLoadScript(Ref.dynamicUIJs);
  // lazy loading dependencies
  tryLoadScript(Ref.tinyColorMinJs);
  // ADHOC: add a delay to hide setting content init process
  setTimeout(() => {
    toggleSettingPanel();
  }, 50);
}
function toggleSettingPanel() {
  $settingPanel.toggleClass('show');
  $settingButton.toggleClass('active');
}
