"use strict";
const localFrameworkPath = '/dynamic-ui-framework';
const remoteFrameworkPath = 'https://enginoobz.com/dynamic-ui-framework';
const settingFilePath = `${localFrameworkPath}/setting.html`;
const settingButtonFilePath = `${localFrameworkPath}/setting-button.html`;
const dynamicUIFilePath = `${localFrameworkPath}/js/DynamicUI.js`;
// ad-hoc fallback to load file on remote server for different projects
// TODO: resolve CORS or use CDN
const fallbackSettingFilePath = `${remoteFrameworkPath}/setting.html`;
const fallbackSettingButtonFilePath = `${remoteFrameworkPath}/setting-button.html`;
const fallbackDynamicUIFilePath = `${remoteFrameworkPath}/js/DynamicUI.js`;
let settingPanelLoaded = false;
let $settingButton;
let $settingPanel;
// lazy loading setting button
loadFile(settingButtonFilePath)
    .done(setupButtonEvent)
    .fail(() => loadFile(fallbackSettingButtonFilePath)
    .done(setupButtonEvent));
function loadFile(filePath) {
    return $.get(filePath, function (data) {
        $('body').append(data);
    });
}
function setupButtonEvent() {
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
    loadFile(settingFilePath)
        .done(onSettingPanelLoaded)
        .fail(() => loadFile(fallbackSettingFilePath)
        .done(onSettingPanelLoaded));
}
function onSettingPanelLoaded() {
    settingPanelLoaded = true;
    $settingPanel = $("#setting-section .setting-panel");
    // lazy loading main framework script
    loadScript(dynamicUIFilePath, toggleSettingPanel, () => {
        loadScript(fallbackDynamicUIFilePath, toggleSettingPanel, () => { });
    });
}
function toggleSettingPanel() {
    $settingPanel.toggleClass('show');
    $settingButton.toggleClass('active');
}
function loadScript(src, onload, onerror) {
    const script = document.createElement('script');
    script.onerror = onerror;
    script.onload = onload;
    // script.async = true;
    script.src = src;
    script.type = "module";
    document.head.appendChild(script);
}
