import * as DynamicSelectors from './selectors/DynamicSelectors.js'
import { Style } from './base/Style.js'
import { StyleRegistry } from './StyleRegistry.js';
import { Color } from './base/Color.js';
import { TinyColor } from './base/TinyColor.js';

// TODO: create class

//elements for this specific projects
let $squareImg: JQuery<HTMLElement>;

export let colorfull1: Color = new TinyColor("#01724b");
export let colorfull2: Color = new TinyColor("#bc5b00");
export let colorfull3: Color = new TinyColor("#c40639");

export let schemeColor: Color = new TinyColor("#D4D4D4");
export let highlightColor: Color = new TinyColor("#004b97");
export let baseColor: string = 'black';
const lightMutedBaseColor: string = "#b2b2b2";
const darkMutedBaseColor: string = "#4D4D4D";
export let mutedBaseColor: string = darkMutedBaseColor;

let borderRadius: number = 9;

export let currentStyle: Style;

//populate all style names since we have init css files
let stylesWithUpdatedSchemeColor: string[] = ['flat-style', 'neu-style', 'glass-style'];
let stylesWithUpdatedHighlightColor: string[] = ['flat-style', 'neu-style', 'glass-style'];
let stylesWithUpdatedBaseColor: string[] = ['flat-style', 'neu-style', 'glass-style'];

let styleSheet: CSSStyleSheet;
let cssRules: CSSRuleList;

function createStyleSheet(): CSSStyleSheet {
        var style = document.createElement("style");
        document.head.appendChild(style);
        return style.sheet!;
}

function insertEmptyRule(selector: string): CSSStyleRule {
        return cssRules[styleSheet.insertRule(`${selector} {}`)] as CSSStyleRule;
}

let borderRadiusRule: CSSStyleRule;
let bgHighlightRule: CSSStyleRule;
let bgSchemeRule: CSSStyleRule;
let bgBaseRule: CSSStyleRule;
let colorHighlightRule: CSSStyleRule;
let colorBaseRule: CSSStyleRule;
let colorMutedBaseRule: CSSStyleRule;

function getBgHighlightRule(): CSSStyleRule {
        return bgHighlightRule ?? (bgHighlightRule = insertEmptyRule(DynamicSelectors.bgHighlightSelectors));
}
function getBgSchemeRule(): CSSStyleRule {
        return bgSchemeRule ?? (bgSchemeRule = insertEmptyRule(DynamicSelectors.bgSchemeSelectors));
}
function getBgBaseRule(): CSSStyleRule {
        return bgBaseRule ?? (bgBaseRule = insertEmptyRule(DynamicSelectors.bgBaseSelectors));
}
function getColorHighlightRule(): CSSStyleRule {
        return colorHighlightRule ?? (colorHighlightRule = insertEmptyRule(DynamicSelectors.colorHighlightSelectors));
}
function getColorBaseRule(): CSSStyleRule {
        return colorBaseRule ?? (colorBaseRule = insertEmptyRule(DynamicSelectors.colorBaseSelectors));
}
function getColorMutedBaseRule(): CSSStyleRule {
        return colorMutedBaseRule ?? (colorMutedBaseRule = insertEmptyRule(DynamicSelectors.colorMutedBaseSelectors));
}
function getBorderRadiusRule(): CSSStyleRule {
        return borderRadiusRule ?? (borderRadiusRule = insertEmptyRule(DynamicSelectors.borderRadiusSelectors));
}

export function changeStyle(newStyle: Style) {
        currentStyle?.onDisable();
        currentStyle = newStyle;
        $(".customizer").hide();
        currentStyle.onEnable();
        $("body").removeClass();
        $("body").addClass(currentStyle.name);
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

loadSettingPanel();

function loadSettingPanel() {
        $.get('sections/setting.php', function (data) {
                $('body').append(data);
        }).done(function () {
                initSettingPanel();
                setupSettingEvents();
                $squareImg = $(".hero-image .square img");
                styleSheet = createStyleSheet();
                cssRules = styleSheet.cssRules || styleSheet.rules;
                new StyleRegistry();
        });
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
                $(event.currentTarget).addClass('active')
        });
        setupColorPickerEvents();
        setupRangeSliderEvents();
}

function setupColorPickerEvents() {
        $("#highlight-color-picker").on('input', function (event) {
                updateHighlightColor((event.target as any).value);
        });
        $("#scheme-color-picker").on('input', function (event) {
                updateSchemeColor((event.target as any).value);
        });
        $("#colorfull1-picker").on('input', function (event) {
                colorfull1.setHex((event.target as any).value);
                updateColorfull(1);
        });
        $("#colorfull2-picker").on('input', function (event) {
                colorfull2.setHex((event.target as any).value);
                updateColorfull(2);
        });
        $("#colorfull3-picker").on('input', function (event) {
                colorfull3.setHex((event.target as any).value);
                updateColorfull(3);
        });
}

function setupRangeSliderEvents() {
        $("#border-radius").on('input', (event) => {
                const newValue = (event.target as HTMLInputElement).value;
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

function updateColorfull(colorfullNumber: number) {
        let colorfull: Color;
        let timelineSelector: string;
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

        $(`.colorfull${colorfullNumber}, .background-colorfull${colorfullNumber}>.badge`).css('color', colorfull!.hex);
        $(`.background-colorfull${colorfullNumber}`).css('background-color', colorfull!.hex);
        $(`.background-colorfull${colorfullNumber}`).css('color', colorfull!.getInvertBlackWhite());
        $(`${timelineSelector!} .timeline-item`).css('border-left-color', colorfull!.hex);
        $(`.badge-pill.background-colorfull${colorfullNumber} .badge`).css('background', colorfull!.getInvertBlackWhite());
};

function updateHighlightColor(hex: string) {
        highlightColor.setHex(hex);
        getBgHighlightRule().style.setProperty('background-color', highlightColor.hex, 'important');
        getColorHighlightRule().style.setProperty('color', highlightColor.hex, 'important');

        currentStyle.onHighlightColorUpdated();
        stylesWithUpdatedHighlightColor.length = 0;
        stylesWithUpdatedHighlightColor.push(currentStyle.name);
}

function updateSchemeColor(hex: string) {
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
        if (lastBaseColor != baseColor) onBaseColorChanged();
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

