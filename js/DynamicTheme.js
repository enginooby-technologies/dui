import { settingFilePath, StyleName } from './Config.js';
import * as DynamicSelectors from './selectors/DynamicSelectors.js';
import { StyleRegistry } from './StyleRegistry.js';
import { TinyColor } from './base/TinyColor.js';
// TODO: create class
//TODO; elements for specific project
let $squareImg;
let $body;
export let colorfull1 = new TinyColor("#01724b");
export let colorfull2 = new TinyColor("#bc5b00");
export let colorfull3 = new TinyColor("#c40639");
export let schemeColor = new TinyColor("#D4D4D4");
export let highlightColor = new TinyColor("#004b97");
export let baseColor = 'black';
const lightMutedBaseColor = "#b2b2b2";
const darkMutedBaseColor = "#4D4D4D";
export let mutedBaseColor = darkMutedBaseColor;
let currentBg;
// although we select global bg for all UI styles, at the first time before doing that, 
// each style can have its separate  preferred bg (e.g. glass-style w/ bg-3, neu-style w/o bg),
// only when we manually update  bg from setting panel, all styles are triggerd to use global bg instead of its preferred one.
let updateGlobalBgTriggered = false;
let borderRadius = 9;
export let currentStyle;
//populate all style names since we have init css files
let stylesWithUpdatedSchemeColor = [StyleName.Flat, StyleName.Glass, StyleName.Neu];
let stylesWithUpdatedHighlightColor = [StyleName.Flat, StyleName.Glass, StyleName.Neu];
let stylesWithUpdatedBaseColor = [StyleName.Flat, StyleName.Glass, StyleName.Neu];
let styleSheet;
let cssRules;
function createStyleSheet() {
    var style = document.createElement("style");
    document.head.appendChild(style);
    return style.sheet;
}
function insertEmptyRule(selector) {
    return cssRules[styleSheet.insertRule(`${selector} {}`)];
}
let borderRadiusRule;
let bgHighlightRule;
let bgSchemeRule;
let bgBaseRule;
let colorHighlightRule;
let colorBaseRule;
let colorMutedBaseRule;
let colorColorfull1Rule;
let colorColorfull2Rule;
let colorColorfull3Rule;
function getBgHighlightRule() {
    return bgHighlightRule !== null && bgHighlightRule !== void 0 ? bgHighlightRule : (bgHighlightRule = insertEmptyRule(DynamicSelectors.bgHighlightSelectors));
}
function getBgSchemeRule() {
    return bgSchemeRule !== null && bgSchemeRule !== void 0 ? bgSchemeRule : (bgSchemeRule = insertEmptyRule(DynamicSelectors.bgSchemeSelectors));
}
function getBgBaseRule() {
    return bgBaseRule !== null && bgBaseRule !== void 0 ? bgBaseRule : (bgBaseRule = insertEmptyRule(DynamicSelectors.bgBaseSelectors));
}
function getColorHighlightRule() {
    return colorHighlightRule !== null && colorHighlightRule !== void 0 ? colorHighlightRule : (colorHighlightRule = insertEmptyRule(DynamicSelectors.colorHighlightSelectors));
}
function getColorBaseRule() {
    return colorBaseRule !== null && colorBaseRule !== void 0 ? colorBaseRule : (colorBaseRule = insertEmptyRule(DynamicSelectors.colorBaseSelectors));
}
function getColorMutedBaseRule() {
    return colorMutedBaseRule !== null && colorMutedBaseRule !== void 0 ? colorMutedBaseRule : (colorMutedBaseRule = insertEmptyRule(DynamicSelectors.colorMutedBaseSelectors));
}
function getBorderRadiusRule() {
    return borderRadiusRule !== null && borderRadiusRule !== void 0 ? borderRadiusRule : (borderRadiusRule = insertEmptyRule(DynamicSelectors.borderRadiusSelectors));
}
function getColorfull1Rule() {
    return colorColorfull1Rule !== null && colorColorfull1Rule !== void 0 ? colorColorfull1Rule : (colorColorfull1Rule = insertEmptyRule(DynamicSelectors.colorColorfull1Selectors));
}
function getColorfull2Rule() {
    return colorColorfull2Rule !== null && colorColorfull2Rule !== void 0 ? colorColorfull2Rule : (colorColorfull2Rule = insertEmptyRule(DynamicSelectors.colorColorfull2Selectors));
}
function getColorfull3Rule() {
    return colorColorfull3Rule !== null && colorColorfull3Rule !== void 0 ? colorColorfull3Rule : (colorColorfull3Rule = insertEmptyRule(DynamicSelectors.colorColorfull3Selectors));
}
export function changeStyle(newStyle) {
    currentStyle === null || currentStyle === void 0 ? void 0 : currentStyle.onDisable();
    $body.removeClass(currentStyle === null || currentStyle === void 0 ? void 0 : currentStyle.name);
    if (!updateGlobalBgTriggered)
        $body.removeClass(currentStyle === null || currentStyle === void 0 ? void 0 : currentStyle.preferredBg);
    currentStyle = newStyle;
    $body.addClass(currentStyle.name);
    if (!updateGlobalBgTriggered)
        $body.addClass(currentStyle === null || currentStyle === void 0 ? void 0 : currentStyle.preferredBg);
    currentBg = currentStyle === null || currentStyle === void 0 ? void 0 : currentStyle.preferredBg;
    $(".customizer").hide();
    currentStyle.onEnable();
    updateChangesFromLastStyle();
}
function updateChangesFromLastStyle() {
    if (!stylesWithUpdatedSchemeColor.includes(currentStyle.name)) {
        currentStyle.onSchemeColorUpdated();
        stylesWithUpdatedSchemeColor.push(currentStyle.name);
    }
    if (!stylesWithUpdatedHighlightColor.includes(currentStyle.name)) {
        currentStyle.onHighlightColorUpdated();
        stylesWithUpdatedHighlightColor.push(currentStyle.name);
    }
    if (!stylesWithUpdatedBaseColor.includes(currentStyle.name)) {
        currentStyle.onBaseColorUpdated();
        stylesWithUpdatedBaseColor.push(currentStyle.name);
    }
}
loadSettingPanel(settingFilePath)
    // ad-hoc solution to load file for the demo page this framework
    .fail(() => loadSettingPanel('setting.html')
    .fail(() => loadSettingPanel('setting.php')));
function loadSettingPanel(filePath) {
    return $.get(filePath, function (data) {
        $('body').append(data);
    }).done(function () {
        setup();
    });
}
function setup() {
    initSettingPanel();
    setupSettingEvents();
    $squareImg = $(".hero-image .square img");
    $body = $("body");
    styleSheet = createStyleSheet();
    cssRules = styleSheet.cssRules || styleSheet.rules;
    new StyleRegistry();
    $body.addClass(currentStyle === null || currentStyle === void 0 ? void 0 : currentStyle.preferredBg);
    // $(DynamicSelectors.bgSelectors).each((index, element) => {
    //         element.classList.add(currentBackground);
    // });
    // TODO: Toggle setting panel/button & scrollbar box-shadow according to current background so that does not look weird
}
function initSettingPanel() {
    $("#scheme-color-picker").attr('value', schemeColor.hex);
    $("#highlight-color-picker").attr('value', highlightColor.hex);
    $('#border-radius').attr('value', borderRadius);
    $("#border-radius").next('.range-slider__value').html(borderRadius.toString());
}
function setupSettingEvents() {
    $("#setting-section .setting-button-border").on('click', function () {
        $("#setting-section .setting-panel").toggleClass('show');
        $(this).toggleClass('active');
        $('#setting-section .setting-button').toggleClass('active');
    });
    $('.theme-skin.radio-button-group .button').on('click', event => {
        $('.theme-skin.radio-button-group .button').removeClass('active');
        $(event.currentTarget).addClass('active');
    });
    setupColorPickerEvents();
    setupRangeSliderEvents();
    $('.background-item').on('click', (event) => {
        updateGlobalBgTriggered = true;
        const lastBg = currentBg;
        currentBg = event.currentTarget.id;
        $body.removeClass(lastBg);
        $body.addClass(currentBg);
        // $(DynamicSelectors.bgSelectors).each((index, element) => {
        //         element.classList.remove(lastBackground);
        //         element.classList.add(currentBackground);
        // })
    });
}
function setupColorPickerEvents() {
    $("#highlight-color-picker").on('input', function (event) {
        updateHighlightColor(event.target.value);
    });
    $("#scheme-color-picker").on('input', function (event) {
        updateSchemeColor(event.target.value);
    });
    $("#colorfull1-picker").on('input', function (event) {
        colorfull1.setHex(event.target.value);
        updateColorfull(1);
    });
    $("#colorfull2-picker").on('input', function (event) {
        colorfull2.setHex(event.target.value);
        updateColorfull(2);
    });
    $("#colorfull3-picker").on('input', function (event) {
        colorfull3.setHex(event.target.value);
        updateColorfull(3);
    });
}
function setupRangeSliderEvents() {
    $("#border-radius").on('input', (event) => {
        const newValue = event.target.value;
        $("#" + event.target.id).next('.range-slider__value').text(newValue);
        switch (event.target.id) {
            case 'border-radius':
                borderRadius = parseInt(newValue);
                break;
        }
        updateBorder();
    });
}
function updateBorder() {
    getBorderRadiusRule().style.setProperty('border-radius', `${borderRadius}px`);
    $('.background-item').css('border-radius', borderRadius * 6); // since its zoom is 1/6
}
function updateColorfull(colorfullNumber) {
    let colorfull;
    let timelineSelector;
    if (colorfullNumber == 1) {
        colorfull = colorfull1;
        timelineSelector = '#education-timeline';
        getColorfull1Rule().style.setProperty('color', colorfull1.hex, 'important');
    }
    if (colorfullNumber == 2) {
        colorfull = colorfull2;
        timelineSelector = '#experience-timeline';
        getColorfull2Rule().style.setProperty('color', colorfull2.hex, 'important');
    }
    if (colorfullNumber == 3) {
        colorfull = colorfull3;
        timelineSelector = '#achievements-timeline';
        getColorfull3Rule().style.setProperty('color', colorfull3.hex, 'important');
    }
    $(`.colorfull${colorfullNumber}, .background-colorfull${colorfullNumber}>.badge`).css('color', colorfull.hex);
    $(`.background-colorfull${colorfullNumber}`).css('background-color', colorfull.hex);
    $(`.background-colorfull${colorfullNumber}`).css('color', colorfull.getInvertBlackWhite());
    $(`${timelineSelector} .timeline-item`).css('border-left-color', colorfull.hex);
    $(`.badge-pill.background-colorfull${colorfullNumber} .badge`).css('background', colorfull.getInvertBlackWhite());
}
;
function updateHighlightColor(hex) {
    highlightColor.setHex(hex);
    getBgHighlightRule().style.setProperty('background-color', highlightColor.hex, 'important');
    getColorHighlightRule().style.setProperty('color', highlightColor.hex, 'important');
    currentStyle.onHighlightColorUpdated();
    stylesWithUpdatedHighlightColor.length = 0;
    stylesWithUpdatedHighlightColor.push(currentStyle.name);
}
function updateSchemeColor(hex) {
    schemeColor.setHex(hex);
    updateBaseColor();
    getBgSchemeRule().style.setProperty('background-color', schemeColor.hex, 'important');
    currentStyle.onSchemeColorUpdated();
    stylesWithUpdatedSchemeColor.length = 0;
    stylesWithUpdatedSchemeColor.push(currentStyle.name);
}
function updateBaseColor() {
    const lastBaseColor = baseColor;
    baseColor = schemeColor.getInvertBlackWhite();
    if (lastBaseColor != baseColor)
        onBaseColorChanged();
}
function onBaseColorChanged() {
    mutedBaseColor = (baseColor == '#ffffff') ? lightMutedBaseColor : darkMutedBaseColor;
    const heroImg = (baseColor == '#ffffff') ? "light-element_square" : "dark-element_square";
    $squareImg.attr('src', `assets/img/${heroImg}.png`);
    getColorBaseRule().style.setProperty('color', baseColor, 'important');
    getColorMutedBaseRule().style.setProperty('color', mutedBaseColor, 'important');
    getBgBaseRule().style.setProperty('background-color', baseColor, 'important');
    $('.overlay-menu-toggler lord-icon').attr('colors', `primary:${baseColor}`);
    $('.code-block pre code').css('text-shadow', `0 .5px  ${schemeColor.getInvert()}`);
    currentStyle.onBaseColorUpdated();
    stylesWithUpdatedBaseColor.length = 0;
    stylesWithUpdatedBaseColor.push(currentStyle.name);
}
