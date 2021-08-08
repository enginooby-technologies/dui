import { Color } from '../base/Color.js';
import { TinyColor } from '../base/TinyColor.js';
import { DynamicUI, root } from './DynamicUI.js';
import * as DynamicSelectors from '../selectors/DynamicSelectors.js'
import { FlatConfig, GlassConfig, NesConfig, NeuConfig, Win98Config } from '../StyleConfig.js';

const lightMutedBaseColor: string = "#b2b2b2";
const darkMutedBaseColor: string = "#4D4D4D";

export class DynamicColor {

        static colorfull1: Color = new TinyColor("#01724b");
        static colorfull2: Color = new TinyColor("#bc5b00");
        static colorfull3: Color = new TinyColor("#c40639");

        static schemeColor: Color = new TinyColor("#D4D4D4");
        static highlightColor: Color;
        static baseColor: string = 'black';

        static mutedBaseColor: string = darkMutedBaseColor;

        stylesWithUpdatedSchemeColor: string[] = [FlatConfig.name, NeuConfig.name, NesConfig.name, Win98Config.name, GlassConfig.name];
        stylesWithUpdatedBaseColor: string[] = this.stylesWithUpdatedSchemeColor;

        // TODO: handle specific project element
        $squareImg?: JQuery<HTMLElement>;

        constructor() {
                this.$squareImg = $(".hero-image .square img");
                $("#scheme-color-picker").attr('value', DynamicColor.schemeColor.hex);
                // TOFIX: Can not get initial value of color to init the picker
                DynamicColor.highlightColor = new TinyColor(root.style.getPropertyValue('--highlight-color'));
                $("#highlight-color-picker").attr('value', DynamicColor.highlightColor.hex);
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
                root.style.setProperty(`--group-${groupNumber}-color`, color.hex)
                root.style.setProperty(`--group-${groupNumber}-color-inverted`, color.getInvertBlackWhite())
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
                root.style.setProperty('--highlight-color-invert', DynamicColor.highlightColor.getInvertBlackWhite());
                root.style.setProperty('--highlight-color', DynamicColor.highlightColor.hex);
                DynamicUI.currentStyle?.onHighlightColorUpdated();
        }

        private updateSchemeColor(hex: string) {
                DynamicColor.schemeColor.setHex(hex);
                root.style.setProperty('--scheme-color', DynamicColor.schemeColor.hex);

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
                root.style.setProperty('--base-color', DynamicColor.baseColor);
                root.style.setProperty('--base-color-muted', DynamicColor.mutedBaseColor);

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