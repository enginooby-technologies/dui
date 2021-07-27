import { settingFilePath, StyleName } from './Config.js';
import * as DynamicSelectors from './selectors/DynamicSelectors.js';
import { StyleRegistry } from './StyleRegistry.js';
import { TinyColor } from './base/TinyColor.js';
// TODO: create class
//TODO; elements for specific project
let $squareImg;
export let colorfull1 = new TinyColor("#01724b");
export let colorfull2 = new TinyColor("#bc5b00");
export let colorfull3 = new TinyColor("#c40639");
export let schemeColor = new TinyColor("#D4D4D4");
export let highlightColor = new TinyColor("#004b97");
export let baseColor = 'black';
const lightMutedBaseColor = "#b2b2b2";
const darkMutedBaseColor = "#4D4D4D";
export let mutedBaseColor = darkMutedBaseColor;
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
export function changeStyle(newStyle) {
    currentStyle === null || currentStyle === void 0 ? void 0 : currentStyle.onDisable();
    currentStyle = newStyle;
    $(".customizer").hide();
    $("body").removeClass();
    $("body").addClass(currentStyle.name);
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
    // .fail(() => loadSettingPanel('setting.html'))
    .fail(() => loadSettingPanel('php/setting.php'));
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
    styleSheet = createStyleSheet();
    cssRules = styleSheet.cssRules || styleSheet.rules;
    new StyleRegistry();
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
    }
    if (colorfullNumber == 2) {
        colorfull = colorfull2;
        timelineSelector = '#experience-timeline';
    }
    if (colorfullNumber == 3) {
        colorfull = colorfull3;
        timelineSelector = '#achievements-timeline';
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
    currentStyle.onBaseColorUpdated();
    stylesWithUpdatedBaseColor.length = 0;
    stylesWithUpdatedBaseColor.push(currentStyle.name);
}
