import { TinyColor } from '../base/TinyColor.js';
import { DynamicUI } from './DynamicUI.js';
import { FlatConfig, GlassConfig, NesConfig, NeuConfig, Win98Config } from '../StyleConfig.js';
import { root } from '../global.js';
const lightMutedBaseColor = "#b2b2b2";
const darkMutedBaseColor = "#4D4D4D";
export class DynamicColor {
    constructor() {
        this.stylesWithUpdatedSchemeColor = [FlatConfig.name, NeuConfig.name, NesConfig.name, Win98Config.name, GlassConfig.name];
        this.stylesWithUpdatedBaseColor = this.stylesWithUpdatedSchemeColor;
        this.$squareImg = $(".hero-image .square img");
        $("#scheme-color-picker").attr('value', DynamicColor.schemeColor.hex);
        DynamicColor.highlightColor = new TinyColor(root.style.getPropertyValue('--highlight-color'));
        // TOFIX: Can not get initial value of color to init the picker
        // $("#highlight-color-picker").attr('value', DynamicColor.highlightColor.hex);
        this.setupColorPickerEvents();
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
            this.updateGroupColorRule(DynamicColor.colorfull1, 1);
        });
        $("#colorfull2-picker").on('input', (event) => {
            DynamicColor.colorfull2.setHex(event.target.value);
            this.updateGroupColorRule(DynamicColor.colorfull2, 2);
        });
        $("#colorfull3-picker").on('input', (event) => {
            DynamicColor.colorfull3.setHex(event.target.value);
            this.updateGroupColorRule(DynamicColor.colorfull3, 3);
        });
    }
    updateGroupColorRule(color, groupNumber) {
        root.style.setProperty(`--dui-color-${groupNumber}`, color.hex);
        root.style.setProperty(`--dui-color-${groupNumber}-invert`, color.getInvertBlackWhite());
    }
    ;
    updateChangesFromLastStyle() {
        if (!this.stylesWithUpdatedSchemeColor.includes(DynamicUI.currentStyle.name)) {
            DynamicUI.currentStyle.onSchemeColorUpdated();
            this.stylesWithUpdatedSchemeColor.push(DynamicUI.currentStyle.name);
        }
        if (!this.stylesWithUpdatedBaseColor.includes(DynamicUI.currentStyle.name)) {
            DynamicUI.currentStyle.onBaseColorUpdated();
            this.stylesWithUpdatedBaseColor.push(DynamicUI.currentStyle.name);
        }
    }
    updateHighlightColor(hex) {
        var _a;
        DynamicColor.highlightColor.setHex(hex);
        root.style.setProperty('--dui-primary-invert', DynamicColor.highlightColor.getInvertBlackWhite());
        this.updateColorCssVar('--dui-primary', DynamicColor.highlightColor);
        (_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.onHighlightColorUpdated();
    }
    updateColorCssVar(cssVar, color) {
        root.style.setProperty(cssVar, `${color.rValue}, ${color.gValue}, ${color.bValue}`);
    }
    updateSchemeColor(hex) {
        DynamicColor.schemeColor.setHex(hex);
        this.updateColorCssVar('--dui-scheme', DynamicColor.schemeColor);
        this.updateBaseColor();
        DynamicUI.currentStyle.onSchemeColorUpdated();
        this.stylesWithUpdatedSchemeColor.length = 0;
        this.stylesWithUpdatedSchemeColor.push(DynamicUI.currentStyle.name);
    }
    updateBaseColor() {
        const lastBaseColor = DynamicColor.baseColor;
        DynamicColor.baseColor = DynamicColor.schemeColor.getInvertBlackWhite();
        if (lastBaseColor != DynamicColor.baseColor)
            this.onBaseColorChange();
    }
    onBaseColorChange() {
        DynamicColor.mutedBaseColor = (DynamicColor.baseColor == '#ffffff') ? lightMutedBaseColor : darkMutedBaseColor;
        root.style.setProperty('--dui-base', DynamicColor.baseColor);
        root.style.setProperty('--dui-base-mute', DynamicColor.mutedBaseColor);
        // SPECIFIC
        const heroImg = (DynamicColor.baseColor == '#ffffff') ? "light-element_square" : "dark-element_square";
        this.$squareImg.attr('src', `assets/img/${heroImg}.png`);
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
DynamicColor.baseColor = 'black';
DynamicColor.mutedBaseColor = darkMutedBaseColor;
