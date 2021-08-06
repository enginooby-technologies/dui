import { TinyColor } from '../base/TinyColor.js';
import { DynamicUI } from './DynamicUI.js';
import * as DynamicSelectors from '../selectors/DynamicSelectors.js';
import { FlatConfig, GlassConfig, NesConfig, NeuConfig, Win98Config } from '../StyleConfig.js';
const lightMutedBaseColor = "#b2b2b2";
const darkMutedBaseColor = "#4D4D4D";
export class DynamicColor {
    constructor() {
        // TODO: remove these and just compare colors between DynamicUI and currentStyle
        //populate all style names since we have init css files
        this.stylesWithUpdatedSchemeColor = [FlatConfig.name, NeuConfig.name, NesConfig.name, Win98Config.name, GlassConfig.name];
        this.stylesWithUpdatedHighlightColor = this.stylesWithUpdatedSchemeColor;
        this.stylesWithUpdatedBaseColor = this.stylesWithUpdatedSchemeColor;
        this.$squareImg = $(".hero-image .square img");
        $("#scheme-color-picker").attr('value', DynamicColor.schemeColor.hex);
        $("#highlight-color-picker").attr('value', DynamicColor.highlightColor.hex);
        this.setupColorPickerEvents();
    }
    getBgHighlightRule() {
        var _a;
        return (_a = this.bgHighlightRule) !== null && _a !== void 0 ? _a : (this.bgHighlightRule = DynamicUI.insertEmptyRule(DynamicSelectors.bgHighlightSelectors));
    }
    getBgSchemeRule() {
        var _a;
        return (_a = this.bgSchemeRule) !== null && _a !== void 0 ? _a : (this.bgSchemeRule = DynamicUI.insertEmptyRule(DynamicSelectors.bgSchemeSelectors));
    }
    getBgBaseRule() {
        var _a;
        return (_a = this.bgBaseRule) !== null && _a !== void 0 ? _a : (this.bgBaseRule = DynamicUI.insertEmptyRule(DynamicSelectors.bgBaseSelectors));
    }
    getColorHighlightRule() {
        var _a;
        return (_a = this.colorHighlightRule) !== null && _a !== void 0 ? _a : (this.colorHighlightRule = DynamicUI.insertEmptyRule(DynamicSelectors.colorHighlightSelectors));
    }
    getColorBaseRule() {
        var _a;
        return (_a = this.colorBaseRule) !== null && _a !== void 0 ? _a : (this.colorBaseRule = DynamicUI.insertEmptyRule(DynamicSelectors.colorBaseSelectors));
    }
    getColorMutedBaseRule() {
        var _a;
        return (_a = this.colorMutedBaseRule) !== null && _a !== void 0 ? _a : (this.colorMutedBaseRule = DynamicUI.insertEmptyRule(DynamicSelectors.colorMutedBaseSelectors));
    }
    getColorfull1Rule() {
        var _a;
        return (_a = this.colorColorfull1Rule) !== null && _a !== void 0 ? _a : (this.colorColorfull1Rule = DynamicUI.insertEmptyRule(DynamicSelectors.colorColorfull1Selectors));
    }
    getColorfull2Rule() {
        var _a;
        return (_a = this.colorColorfull2Rule) !== null && _a !== void 0 ? _a : (this.colorColorfull2Rule = DynamicUI.insertEmptyRule(DynamicSelectors.colorColorfull2Selectors));
    }
    getColorfull3Rule() {
        var _a;
        return (_a = this.colorColorfull3Rule) !== null && _a !== void 0 ? _a : (this.colorColorfull3Rule = DynamicUI.insertEmptyRule(DynamicSelectors.colorColorfull3Selectors));
    }
    setupColorPickerEvents() {
        $("#highlight-color-picker").on('input', (event) => {
            this.updateHighlightColor(event.target.value);
        });
        $("#scheme-color-picker").on('input', (event) => {
            this.updateSchemeColor(event.target.value);
        });
        $("#colorfull1-picker").on('input', (event) => {
            DynamicColor.colorfull1.setHex(event.target.value);
            this.updateColorfull(1);
        });
        $("#colorfull2-picker").on('input', (event) => {
            DynamicColor.colorfull2.setHex(event.target.value);
            this.updateColorfull(2);
        });
        $("#colorfull3-picker").on('input', (event) => {
            DynamicColor.colorfull3.setHex(event.target.value);
            this.updateColorfull(3);
        });
    }
    updateChangesFromLastStyle() {
        if (!this.stylesWithUpdatedSchemeColor.includes(DynamicUI.currentStyle.name)) {
            DynamicUI.currentStyle.onSchemeColorUpdated();
            this.stylesWithUpdatedSchemeColor.push(DynamicUI.currentStyle.name);
        }
        if (!this.stylesWithUpdatedHighlightColor.includes(DynamicUI.currentStyle.name)) {
            DynamicUI.currentStyle.onHighlightColorUpdated();
            this.stylesWithUpdatedHighlightColor.push(DynamicUI.currentStyle.name);
        }
        if (!this.stylesWithUpdatedBaseColor.includes(DynamicUI.currentStyle.name)) {
            DynamicUI.currentStyle.onBaseColorUpdated();
            this.stylesWithUpdatedBaseColor.push(DynamicUI.currentStyle.name);
        }
    }
    updateColorfull(colorfullNumber) {
        let colorfull;
        let timelineSelector;
        if (colorfullNumber == 1) {
            colorfull = DynamicColor.colorfull1;
            timelineSelector = '#education-timeline';
            this.getColorfull1Rule().style.setProperty('color', DynamicColor.colorfull1.hex, 'important');
        }
        if (colorfullNumber == 2) {
            colorfull = DynamicColor.colorfull2;
            timelineSelector = '#experience-timeline';
            this.getColorfull2Rule().style.setProperty('color', DynamicColor.colorfull2.hex, 'important');
        }
        if (colorfullNumber == 3) {
            colorfull = DynamicColor.colorfull3;
            timelineSelector = '#achievements-timeline';
            this.getColorfull3Rule().style.setProperty('color', DynamicColor.colorfull3.hex, 'important');
        }
        $(`.colorfull${colorfullNumber}, .background-colorfull${colorfullNumber}>.badge`).css('color', colorfull.hex);
        $(`.background-colorfull${colorfullNumber}`).css('background-color', colorfull.hex);
        $(`.background-colorfull${colorfullNumber}`).css('color', colorfull.getInvertBlackWhite());
        $(`${timelineSelector} .timeline-item`).css('border-left-color', colorfull.hex);
        $(`.badge-pill.background-colorfull${colorfullNumber} .badge`).css('background', colorfull.getInvertBlackWhite());
    }
    ;
    updateHighlightColor(hex) {
        DynamicColor.highlightColor.setHex(hex);
        this.getBgHighlightRule().style.setProperty('background-color', DynamicColor.highlightColor.hex, 'important');
        this.getColorHighlightRule().style.setProperty('color', DynamicColor.highlightColor.hex, 'important');
        DynamicUI.currentStyle.onHighlightColorUpdated();
        this.stylesWithUpdatedHighlightColor.length = 0;
        this.stylesWithUpdatedHighlightColor.push(DynamicUI.currentStyle.name);
    }
    updateSchemeColor(hex) {
        DynamicColor.schemeColor.setHex(hex);
        this.updateBaseColor();
        this.getBgSchemeRule().style.setProperty('background-color', DynamicColor.schemeColor.hex, 'important');
        DynamicUI.currentStyle.onSchemeColorUpdated();
        this.stylesWithUpdatedSchemeColor.length = 0;
        this.stylesWithUpdatedSchemeColor.push(DynamicUI.currentStyle.name);
    }
    updateBaseColor() {
        const lastBaseColor = DynamicColor.baseColor;
        DynamicColor.baseColor = DynamicColor.schemeColor.getInvertBlackWhite();
        if (lastBaseColor != DynamicColor.baseColor)
            this.onBaseColorChanged();
    }
    onBaseColorChanged() {
        DynamicColor.mutedBaseColor = (DynamicColor.baseColor == '#ffffff') ? lightMutedBaseColor : darkMutedBaseColor;
        const heroImg = (DynamicColor.baseColor == '#ffffff') ? "light-element_square" : "dark-element_square";
        this.$squareImg.attr('src', `assets/img/${heroImg}.png`);
        this.getColorBaseRule().style.setProperty('color', DynamicColor.baseColor);
        this.getColorMutedBaseRule().style.setProperty('color', DynamicColor.mutedBaseColor);
        this.getBgBaseRule().style.setProperty('background-color', DynamicColor.baseColor, 'important');
        // specific elements affected by base color
        $('.overlay-menu-toggler lord-icon').attr('colors', `primary:${DynamicColor.baseColor}`);
        $('.code-block pre code').css('text-shadow', `0 .5px  ${DynamicColor.schemeColor.getInvert()}`);
        $('.setting-section .setting-panel .background-item').css('border', `${DynamicColor.mutedBaseColor} 2px solid`);
        DynamicUI.currentStyle.onBaseColorUpdated();
        this.stylesWithUpdatedBaseColor.length = 0;
        this.stylesWithUpdatedBaseColor.push(DynamicUI.currentStyle.name);
    }
}
DynamicColor.colorfull1 = new TinyColor("#01724b");
DynamicColor.colorfull2 = new TinyColor("#bc5b00");
DynamicColor.colorfull3 = new TinyColor("#c40639");
DynamicColor.schemeColor = new TinyColor("#D4D4D4");
DynamicColor.highlightColor = new TinyColor("#004b97");
DynamicColor.baseColor = 'black';
DynamicColor.mutedBaseColor = darkMutedBaseColor;
