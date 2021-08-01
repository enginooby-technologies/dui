import { settingFilePath, StyleName } from './Config.js';
import * as DynamicSelectors from './selectors/DynamicSelectors.js'
import { Style } from './base/Style.js'
import { StyleRegistry } from './StyleRegistry.js';
import { Color } from './base/Color.js';
import { TinyColor } from './base/TinyColor.js';

// TODO: create class

//TODO; elements for specific project
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

// TODO: cache all jQuery selectors
let $body: JQuery<HTMLElement>; //outer background
// TODO: find a way to cache $(innerBgSelector)
let innerBgSelector: string = ".display-content>.container"; // inner background, default is the scheme color
let currentOuterBg: string;
let currentInnerBg: string;
let hasCustomBg: boolean; // if the main project using this framework has its own bg, use "custom-background" class in <body>
const customBgClassName: string = "custom-background"
// although we select global bg for all UI styles, at the first time before doing that, 
// each style can have its separate  preferred bg (e.g. glass-style w/ bg-3, neu-style w/o bg),
// only when we manually update  bg from setting panel, all styles are triggerd to use global bg instead of its preferred one.
let updateGlobalBgTriggered: boolean = false;

let borderRadius: number = 9;

export let currentStyle: Style;

//populate all style names since we have init css files
let stylesWithUpdatedSchemeColor: StyleName[] = [StyleName.Flat, StyleName.Glass, StyleName.Neu];
let stylesWithUpdatedHighlightColor: StyleName[] = [StyleName.Flat, StyleName.Glass, StyleName.Neu];
let stylesWithUpdatedBaseColor: StyleName[] = [StyleName.Flat, StyleName.Glass, StyleName.Neu];

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
let colorColorfull1Rule: CSSStyleRule;
let colorColorfull2Rule: CSSStyleRule;
let colorColorfull3Rule: CSSStyleRule;

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
function getColorfull1Rule(): CSSStyleRule {
        return colorColorfull1Rule ?? (colorColorfull1Rule = insertEmptyRule(DynamicSelectors.colorColorfull1Selectors));
}
function getColorfull2Rule(): CSSStyleRule {
        return colorColorfull2Rule ?? (colorColorfull2Rule = insertEmptyRule(DynamicSelectors.colorColorfull2Selectors));
}
function getColorfull3Rule(): CSSStyleRule {
        return colorColorfull3Rule ?? (colorColorfull3Rule = insertEmptyRule(DynamicSelectors.colorColorfull3Selectors));
}

export function changeStyle(newStyle: Style) {
        currentStyle?.onDisable();
        $body.removeClass(currentStyle?.name);
        if (!updateGlobalBgTriggered) {
                if (!hasCustomBg) $body.removeClass(currentStyle?.preferredOuterBg);
                $(innerBgSelector).each((index, element) => {
                        element.classList.remove(currentStyle?.preferredInnerBg);
                })
        }

        currentStyle = newStyle;
        $body.addClass(currentStyle.name);
        if (!updateGlobalBgTriggered) {
                if (!hasCustomBg) $body.addClass(currentStyle?.preferredOuterBg);
                $(innerBgSelector).each((index, element) => {
                        element.classList.add(currentStyle?.preferredInnerBg);
                })
                currentOuterBg = currentStyle?.preferredOuterBg;
                currentInnerBg = currentStyle?.preferredInnerBg;
        }

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
        // ad-hoc fallback to load file on remote server for different projects
        // TODO: resolve CORS or use CDN
        .fail(() => loadSettingPanel('https://enginoobz.com/dynamic-ui-framework/setting.html')
        );

function loadSettingPanel(filePath: string) {
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
        $body = $('body');
        styleSheet = createStyleSheet();
        cssRules = styleSheet.cssRules || styleSheet.rules;

        hasCustomBg = $body.hasClass(customBgClassName);
        if (hasCustomBg) $(`.setting-panel .${customBgClassName}`).removeClass('hide');
        if (!hasCustomBg) {
                $body.addClass(currentStyle?.preferredOuterBg);
        }
        // TOFIX: not cover all elements if loading them dynamically after page load
        $(innerBgSelector).each((index, element) => {
                element.classList.add(currentStyle?.preferredInnerBg);
        })

        // TODO: Toggle setting panel/button & scrollbar box-shadow according to current background so that does not look weird

        const initStyleName = $body!.attr('class')!.match(/\S*-style\b/i)?.toString();
        new StyleRegistry(initStyleName);

        $(".status_change .dropdown-item").click(function () {
                var getStatusText = $(this).text();
                $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
                var generateStatusClass = `${$(this).attr('data-class')}-status`
                $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
        })
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

        $('#outer-background-panel .background-item').on('click', (event) => {
                // TODO: ad-hoc solution in case use PagePiling and load section dynamically after page load, 
                // therefore all elements with innerBgSelector are not set currentInnerBg yet
                if (!updateGlobalBgTriggered) {
                        $(innerBgSelector).each((index, element) => {
                                element.classList.add(currentInnerBg);
                        })
                }

                updateGlobalBgTriggered = true;
                const lastOuterBg: string = currentOuterBg;
                currentOuterBg = event.currentTarget.getAttribute('class')!.match(/\S*-bg\b/i)?.toString() ?? 'none-bg';
                $body.removeClass(lastOuterBg);
                $body.addClass(currentOuterBg);
        });

        $('#inner-background-panel .background-item').on('click', (event) => {
                updateGlobalBgTriggered = true;
                const lastInnerBg: string = currentInnerBg;
                currentInnerBg = event.currentTarget.id;

                $(innerBgSelector).each((index, element) => {
                        element.classList.remove(lastInnerBg);
                        element.classList.add(currentInnerBg);
                })
        });
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
        // specific elements affected by base color
        $('.overlay-menu-toggler lord-icon').attr('colors', `primary:${baseColor}`);
        $('.code-block pre code').css('text-shadow', `0 .5px  ${schemeColor.getInvert()}`);
        $('.setting-section .setting-panel .background-item').css('border', `${mutedBaseColor} 2px solid`)
        currentStyle.onBaseColorUpdated();
        stylesWithUpdatedBaseColor.length = 0;
        stylesWithUpdatedBaseColor.push(currentStyle.name);
}

