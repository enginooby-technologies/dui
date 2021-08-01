import { fallbackSettingFilePath, settingFilePath, StyleName } from './Config.js';
import * as DynamicSelectors from './selectors/DynamicSelectors.js';
import { StyleRegistry } from './StyleRegistry.js';
import { TinyColor } from './base/TinyColor.js';
const lightMutedBaseColor = "#b2b2b2";
const darkMutedBaseColor = "#4D4D4D";
export class DynamicUI {
    constructor() {
        // TODO: find a way to cache $(innerBgSelector)
        this.innerBgSelector = ".display-content>.container"; // inner background, default is the scheme color
        this.customBgClassName = "custom-background";
        // although we select global bg for all UI styles, at the first time before doing that, 
        // each style can have its separate  preferred bg (e.g. glass-style w/ bg-3, neu-style w/o bg),
        // only when we manually update  bg from setting panel, all styles are triggerd to use global bg instead of its preferred one.
        this.updateGlobalBgTriggered = false;
        this.borderRadius = 9;
        // TODO: remove these and just compare colors between DynamicUI and currentStyle
        //populate all style names since we have init css files
        this.stylesWithUpdatedSchemeColor = [StyleName.Flat, StyleName.Glass, StyleName.Neu];
        this.stylesWithUpdatedHighlightColor = [StyleName.Flat, StyleName.Glass, StyleName.Neu];
        this.stylesWithUpdatedBaseColor = [StyleName.Flat, StyleName.Glass, StyleName.Neu];
        this.loadSettingPanel(settingFilePath)
            .fail(() => this.loadSettingPanel(fallbackSettingFilePath));
    }
    createStyleSheet() {
        var style = document.createElement("style");
        document.head.appendChild(style);
        return style.sheet;
    }
    insertEmptyRule(selector) {
        return this.cssRules[this.styleSheet.insertRule(`${selector} {}`)];
    }
    getBgHighlightRule() {
        var _a;
        return (_a = this.bgHighlightRule) !== null && _a !== void 0 ? _a : (this.bgHighlightRule = this.insertEmptyRule(DynamicSelectors.bgHighlightSelectors));
    }
    getBgSchemeRule() {
        var _a;
        return (_a = this.bgSchemeRule) !== null && _a !== void 0 ? _a : (this.bgSchemeRule = this.insertEmptyRule(DynamicSelectors.bgSchemeSelectors));
    }
    getBgBaseRule() {
        var _a;
        return (_a = this.bgBaseRule) !== null && _a !== void 0 ? _a : (this.bgBaseRule = this.insertEmptyRule(DynamicSelectors.bgBaseSelectors));
    }
    getColorHighlightRule() {
        var _a;
        return (_a = this.colorHighlightRule) !== null && _a !== void 0 ? _a : (this.colorHighlightRule = this.insertEmptyRule(DynamicSelectors.colorHighlightSelectors));
    }
    getColorBaseRule() {
        var _a;
        return (_a = this.colorBaseRule) !== null && _a !== void 0 ? _a : (this.colorBaseRule = this.insertEmptyRule(DynamicSelectors.colorBaseSelectors));
    }
    getColorMutedBaseRule() {
        var _a;
        return (_a = this.colorMutedBaseRule) !== null && _a !== void 0 ? _a : (this.colorMutedBaseRule = this.insertEmptyRule(DynamicSelectors.colorMutedBaseSelectors));
    }
    getBorderRadiusRule() {
        var _a;
        return (_a = this.borderRadiusRule) !== null && _a !== void 0 ? _a : (this.borderRadiusRule = this.insertEmptyRule(DynamicSelectors.borderRadiusSelectors));
    }
    getColorfull1Rule() {
        var _a;
        return (_a = this.colorColorfull1Rule) !== null && _a !== void 0 ? _a : (this.colorColorfull1Rule = this.insertEmptyRule(DynamicSelectors.colorColorfull1Selectors));
    }
    getColorfull2Rule() {
        var _a;
        return (_a = this.colorColorfull2Rule) !== null && _a !== void 0 ? _a : (this.colorColorfull2Rule = this.insertEmptyRule(DynamicSelectors.colorColorfull2Selectors));
    }
    getColorfull3Rule() {
        var _a;
        return (_a = this.colorColorfull3Rule) !== null && _a !== void 0 ? _a : (this.colorColorfull3Rule = this.insertEmptyRule(DynamicSelectors.colorColorfull3Selectors));
    }
    changeStyle(newStyle) {
        var _a, _b, _c, _d, _e, _f;
        (_a = this.currentStyle) === null || _a === void 0 ? void 0 : _a.onDisable();
        this.$body.removeClass((_b = this.currentStyle) === null || _b === void 0 ? void 0 : _b.name);
        if (!this.updateGlobalBgTriggered) {
            if (!this.hasCustomBg)
                this.$body.removeClass((_c = this.currentStyle) === null || _c === void 0 ? void 0 : _c.preferredOuterBg);
            $(this.innerBgSelector).each((index, element) => {
                var _a;
                element.classList.remove((_a = this.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg);
            });
        }
        this.currentStyle = newStyle;
        this.$body.addClass(this.currentStyle.name);
        if (!this.updateGlobalBgTriggered) {
            if (!this.hasCustomBg)
                this.$body.addClass((_d = this.currentStyle) === null || _d === void 0 ? void 0 : _d.preferredOuterBg);
            $(this.innerBgSelector).each((index, element) => {
                var _a;
                element.classList.add((_a = this.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg);
            });
            this.currentOuterBg = (_e = this.currentStyle) === null || _e === void 0 ? void 0 : _e.preferredOuterBg;
            this.currentInnerBg = (_f = this.currentStyle) === null || _f === void 0 ? void 0 : _f.preferredInnerBg;
        }
        $(".customizer").hide();
        this.currentStyle.onEnable();
        this.updateChangesFromLastStyle();
    }
    updateChangesFromLastStyle() {
        if (!this.stylesWithUpdatedSchemeColor.includes(this.currentStyle.name)) {
            this.currentStyle.onSchemeColorUpdated();
            this.stylesWithUpdatedSchemeColor.push(this.currentStyle.name);
        }
        if (!this.stylesWithUpdatedHighlightColor.includes(this.currentStyle.name)) {
            this.currentStyle.onHighlightColorUpdated();
            this.stylesWithUpdatedHighlightColor.push(this.currentStyle.name);
        }
        if (!this.stylesWithUpdatedBaseColor.includes(this.currentStyle.name)) {
            this.currentStyle.onBaseColorUpdated();
            this.stylesWithUpdatedBaseColor.push(this.currentStyle.name);
        }
    }
    loadSettingPanel(filePath) {
        return $.get(filePath, function (data) {
            $('body').append(data);
        }).done(() => {
            this.init();
        });
    }
    init() {
        var _a, _b;
        this.initSettingPanel();
        this.setupSettingEvents();
        this.$squareImg = $(".hero-image .square img");
        this.$body = $('body');
        this.styleSheet = this.createStyleSheet();
        this.cssRules = this.styleSheet.cssRules || this.styleSheet.rules;
        this.hasCustomBg = this.$body.hasClass(this.customBgClassName);
        if (this.hasCustomBg)
            $(`.setting-panel .${this.customBgClassName}`).removeClass('hide');
        if (!this.hasCustomBg) {
            this.$body.addClass((_a = this.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredOuterBg);
        }
        // TOFIX: not cover all elements if loading them dynamically after page load
        $(this.innerBgSelector).each((index, element) => {
            var _a;
            element.classList.add((_a = this.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg);
        });
        // TODO: Toggle setting panel/button & scrollbar box-shadow according to current background so that does not look weird
        const initStyleName = (_b = this.$body.attr('class').match(/\S*-style\b/i)) === null || _b === void 0 ? void 0 : _b.toString();
        new StyleRegistry(this, initStyleName);
        $(".status_change .dropdown-item").click(function () {
            var getStatusText = $(this).text();
            $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
            var generateStatusClass = `${$(this).attr('data-class')}-status`;
            $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
        });
    }
    initSettingPanel() {
        $("#scheme-color-picker").attr('value', DynamicUI.schemeColor.hex);
        $("#highlight-color-picker").attr('value', DynamicUI.highlightColor.hex);
        $('#border-radius').attr('value', this.borderRadius);
        $("#border-radius").next('.range-slider__value').html(this.borderRadius.toString());
    }
    setupSettingEvents() {
        $("#setting-section .setting-button-border").on('click', function () {
            $("#setting-section .setting-panel").toggleClass('show');
            $(this).toggleClass('active');
            $('#setting-section .setting-button').toggleClass('active');
        });
        $('.theme-skin.radio-button-group .button').on('click', event => {
            $('.theme-skin.radio-button-group .button').removeClass('active');
            $(event.currentTarget).addClass('active');
        });
        this.setupColorPickerEvents();
        this.setupRangeSliderEvents();
        $('#outer-background-panel .background-item').on('click', (event) => {
            var _a, _b;
            // TODO: ad-hoc solution in case use PagePiling and load section dynamically after page load, 
            // therefore all elements with innerBgSelector are not set currentInnerBg yet
            if (!this.updateGlobalBgTriggered) {
                $(this.innerBgSelector).each((index, element) => {
                    element.classList.add(this.currentInnerBg);
                });
            }
            this.updateGlobalBgTriggered = true;
            const lastOuterBg = this.currentOuterBg;
            this.currentOuterBg = (_b = (_a = event.currentTarget.getAttribute('class').match(/\S*-bg\b/i)) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 'none-bg';
            this.$body.removeClass(lastOuterBg);
            this.$body.addClass(this.currentOuterBg);
        });
        $('#inner-background-panel .background-item').on('click', (event) => {
            this.updateGlobalBgTriggered = true;
            const lastInnerBg = this.currentInnerBg;
            this.currentInnerBg = event.currentTarget.id;
            $(this.innerBgSelector).each((index, element) => {
                element.classList.remove(lastInnerBg);
                element.classList.add(this.currentInnerBg);
            });
        });
    }
    setupColorPickerEvents() {
        $("#highlight-color-picker").on('input', (event) => {
            this.updateHighlightColor(event.target.value);
        });
        $("#scheme-color-picker").on('input', (event) => {
            this.updateSchemeColor(event.target.value);
        });
        $("#colorfull1-picker").on('input', (event) => {
            DynamicUI.colorfull1.setHex(event.target.value);
            this.updateColorfull(1);
        });
        $("#colorfull2-picker").on('input', (event) => {
            DynamicUI.colorfull2.setHex(event.target.value);
            this.updateColorfull(2);
        });
        $("#colorfull3-picker").on('input', (event) => {
            DynamicUI.colorfull3.setHex(event.target.value);
            this.updateColorfull(3);
        });
    }
    setupRangeSliderEvents() {
        $("#border-radius").on('input', (event) => {
            const newValue = event.target.value;
            $("#" + event.target.id).next('.range-slider__value').text(newValue);
            switch (event.target.id) {
                case 'border-radius':
                    this.borderRadius = parseInt(newValue);
                    break;
            }
            this.updateBorder();
        });
    }
    updateBorder() {
        this.getBorderRadiusRule().style.setProperty('border-radius', `${this.borderRadius}px`);
        $('.background-item').css('border-radius', this.borderRadius * 6); // since its zoom is 1/6
    }
    updateColorfull(colorfullNumber) {
        let colorfull;
        let timelineSelector;
        if (colorfullNumber == 1) {
            colorfull = DynamicUI.colorfull1;
            timelineSelector = '#education-timeline';
            this.getColorfull1Rule().style.setProperty('color', DynamicUI.colorfull1.hex, 'important');
        }
        if (colorfullNumber == 2) {
            colorfull = DynamicUI.colorfull2;
            timelineSelector = '#experience-timeline';
            this.getColorfull2Rule().style.setProperty('color', DynamicUI.colorfull2.hex, 'important');
        }
        if (colorfullNumber == 3) {
            colorfull = DynamicUI.colorfull3;
            timelineSelector = '#achievements-timeline';
            this.getColorfull3Rule().style.setProperty('color', DynamicUI.colorfull3.hex, 'important');
        }
        $(`.colorfull${colorfullNumber}, .background-colorfull${colorfullNumber}>.badge`).css('color', colorfull.hex);
        $(`.background-colorfull${colorfullNumber}`).css('background-color', colorfull.hex);
        $(`.background-colorfull${colorfullNumber}`).css('color', colorfull.getInvertBlackWhite());
        $(`${timelineSelector} .timeline-item`).css('border-left-color', colorfull.hex);
        $(`.badge-pill.background-colorfull${colorfullNumber} .badge`).css('background', colorfull.getInvertBlackWhite());
    }
    ;
    updateHighlightColor(hex) {
        DynamicUI.highlightColor.setHex(hex);
        this.getBgHighlightRule().style.setProperty('background-color', DynamicUI.highlightColor.hex, 'important');
        this.getColorHighlightRule().style.setProperty('color', DynamicUI.highlightColor.hex, 'important');
        this.currentStyle.onHighlightColorUpdated();
        this.stylesWithUpdatedHighlightColor.length = 0;
        this.stylesWithUpdatedHighlightColor.push(this.currentStyle.name);
    }
    updateSchemeColor(hex) {
        DynamicUI.schemeColor.setHex(hex);
        this.updateBaseColor();
        this.getBgSchemeRule().style.setProperty('background-color', DynamicUI.schemeColor.hex, 'important');
        this.currentStyle.onSchemeColorUpdated();
        this.stylesWithUpdatedSchemeColor.length = 0;
        this.stylesWithUpdatedSchemeColor.push(this.currentStyle.name);
    }
    updateBaseColor() {
        const lastBaseColor = DynamicUI.baseColor;
        DynamicUI.baseColor = DynamicUI.schemeColor.getInvertBlackWhite();
        if (lastBaseColor != DynamicUI.baseColor)
            this.onBaseColorChanged();
    }
    onBaseColorChanged() {
        DynamicUI.mutedBaseColor = (DynamicUI.baseColor == '#ffffff') ? lightMutedBaseColor : darkMutedBaseColor;
        const heroImg = (DynamicUI.baseColor == '#ffffff') ? "light-element_square" : "dark-element_square";
        this.$squareImg.attr('src', `assets/img/${heroImg}.png`);
        this.getColorBaseRule().style.setProperty('color', DynamicUI.baseColor, 'important');
        this.getColorMutedBaseRule().style.setProperty('color', DynamicUI.mutedBaseColor, 'important');
        this.getBgBaseRule().style.setProperty('background-color', DynamicUI.baseColor, 'important');
        // specific elements affected by base color
        $('.overlay-menu-toggler lord-icon').attr('colors', `primary:${DynamicUI.baseColor}`);
        $('.code-block pre code').css('text-shadow', `0 .5px  ${DynamicUI.schemeColor.getInvert()}`);
        $('.setting-section .setting-panel .background-item').css('border', `${DynamicUI.mutedBaseColor} 2px solid`);
        this.currentStyle.onBaseColorUpdated();
        this.stylesWithUpdatedBaseColor.length = 0;
        this.stylesWithUpdatedBaseColor.push(this.currentStyle.name);
    }
}
DynamicUI.colorfull1 = new TinyColor("#01724b");
DynamicUI.colorfull2 = new TinyColor("#bc5b00");
DynamicUI.colorfull3 = new TinyColor("#c40639");
DynamicUI.schemeColor = new TinyColor("#D4D4D4");
DynamicUI.highlightColor = new TinyColor("#004b97");
DynamicUI.baseColor = 'black';
DynamicUI.mutedBaseColor = darkMutedBaseColor;
// CONSIDER: where to put this
new DynamicUI();
