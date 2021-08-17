import { Color } from '../base/Color.js';
import { TinyColor } from '../base/TinyColor.js';
import { DynamicUI } from './DynamicUI.js';
import { FlatConfig, GlassConfig, NesConfig, NeuConfig, Win98Config } from '../StyleConfig.js';
import { root } from '../global.js';

const lightMutedBaseColor: string = "#b2b2b2";
const darkMutedBaseColor: string = "#4D4D4D";

export class DynamicColor {

        static colorfull1: Color = new TinyColor("#01724b");
        static colorfull2: Color = new TinyColor("#bc5b00");
        static colorfull3: Color = new TinyColor("#c40639");

        static schemeColor: Color = new TinyColor("#D4D4D4");
        static highlightColor: Color = new TinyColor("#004b97");
        static baseColor: string = 'black';

        static mutedBaseColor: string = darkMutedBaseColor;

        stylesWithUpdatedSchemeColor: string[] = [FlatConfig.name, NeuConfig.name, NesConfig.name, Win98Config.name, GlassConfig.name];
        stylesWithUpdatedBaseColor: string[] = this.stylesWithUpdatedSchemeColor;

        // TODO: handle specific project element
        $squareImg?: JQuery<HTMLElement>;

        constructor() {
                this.$squareImg = $(".hero-image .square img");
                $("#scheme-color-picker").attr('value', DynamicColor.schemeColor.hex);
                // DynamicColor.highlightColor = new TinyColor(root.style.getPropertyValue('--highlight-color'));
                // TOFIX: Can not get initial value of color to init the picker
                // $("#highlight-color-picker").attr('value', DynamicColor.highlightColor.hex);
                this.setupColorPickerEvents();
        }

        private setupColorPickerEvents() {
                $("#highlight-color-picker").on('input', (event) => {
                        this.updateHighlightColor((event.target as any).value);
                });
                $("#scheme-color-picker").on('input', (event) => {
                        this.updateSchemeColor((event.target as any).value);
                });
                $("#colorfull1-picker").on('input', (event) => {
                        DynamicColor.colorfull1.setHex((event.target as any).value);
                        this.updateGroupColorRule(DynamicColor.colorfull1, 1);

                });
                $("#colorfull2-picker").on('input', (event) => {
                        DynamicColor.colorfull2.setHex((event.target as any).value);
                        this.updateGroupColorRule(DynamicColor.colorfull2, 2);

                });
                $("#colorfull3-picker").on('input', (event) => {
                        DynamicColor.colorfull3.setHex((event.target as any).value);
                        this.updateGroupColorRule(DynamicColor.colorfull3, 3);
                });
        }

        private updateGroupColorRule(color: Color, groupNumber: number) {
                root.style.setProperty(`--dui-color-${groupNumber}`, color.hex)
                root.style.setProperty(`--dui-color-${groupNumber}-invert`, color.getInvertBlackWhite())
        };

        public updateChangesFromLastStyle() {
                if (!this.stylesWithUpdatedSchemeColor.includes(DynamicUI.currentStyle!.name)) {
                        DynamicUI.currentStyle!.onSchemeColorUpdated();
                        this.stylesWithUpdatedSchemeColor.push(DynamicUI.currentStyle!.name);
                }
                if (!this.stylesWithUpdatedBaseColor.includes(DynamicUI.currentStyle!.name)) {
                        DynamicUI.currentStyle!.onBaseColorUpdated();
                        this.stylesWithUpdatedBaseColor.push(DynamicUI.currentStyle!.name);
                }
        }

        private updateHighlightColor(hex: string) {
                DynamicColor.highlightColor.setHex(hex);
                root.style.setProperty('--dui-primary-invert', DynamicColor.highlightColor.getInvertBlackWhite());
                this.updateRgbColorCssVar('--dui-primary', DynamicColor.highlightColor);
                this.updateHexColorCssVar('--dui-primary-lighten-1', DynamicColor.highlightColor.getLighten(5));
                this.updateHexColorCssVar('--dui-primary-lighten-2', DynamicColor.highlightColor.getLighten(5));
                this.updateHexColorCssVar('--dui-primary-darken-1', DynamicColor.highlightColor.getDarken(5));
                this.updateHexColorCssVar('--dui-primary-darken-2', DynamicColor.highlightColor.getDarken(10));
                DynamicUI.currentStyle?.onHighlightColorUpdated();
        }

        private updateRgbColorCssVar(cssVar: string, color: Color) {
                root.style.setProperty(cssVar, `${color.rValue}, ${color.gValue}, ${color.bValue}`);
        }

        private updateHexColorCssVar(cssVar: string, color: string) {
                root.style.setProperty(cssVar, color);
        }


        private updateSchemeColor(hex: string) {
                DynamicColor.schemeColor.setHex(hex);
                this.updateRgbColorCssVar('--dui-scheme', DynamicColor.schemeColor);

                this.updateBaseColor();

                DynamicUI.currentStyle!.onSchemeColorUpdated();
                this.stylesWithUpdatedSchemeColor.length = 0;
                this.stylesWithUpdatedSchemeColor.push(DynamicUI.currentStyle!.name);
        }

        private updateBaseColor() {
                const lastBaseColor = DynamicColor.baseColor;
                DynamicColor.baseColor = DynamicColor.schemeColor.getInvertBlackWhite();
                if (lastBaseColor != DynamicColor.baseColor) this.onBaseColorChange();
        }

        private onBaseColorChange() {
                DynamicColor.mutedBaseColor = (DynamicColor.baseColor == '#ffffff') ? lightMutedBaseColor : darkMutedBaseColor;
                root.style.setProperty('--dui-base', DynamicColor.baseColor);
                root.style.setProperty('--dui-base-mute', DynamicColor.mutedBaseColor);

                // SPECIFIC
                const heroImg = (DynamicColor.baseColor == '#ffffff') ? "light-element_square" : "dark-element_square";
                this.$squareImg!.attr('src', `assets/img/${heroImg}.png`);
                // specific elements affected by base color
                $('.overlay-menu-toggler lord-icon').attr('colors', `primary:${DynamicColor.baseColor}`);
                $('.code-block pre code').css('text-shadow', `0 .5px  ${DynamicColor.schemeColor.getInvert()}`);
                $('.setting-section .setting-panel .background-item').css('border', `${DynamicColor.mutedBaseColor} 2px solid`)

                DynamicUI.currentStyle!.onBaseColorUpdated();
                this.stylesWithUpdatedBaseColor.length = 0;
                this.stylesWithUpdatedBaseColor.push(DynamicUI.currentStyle!.name);
        }
}