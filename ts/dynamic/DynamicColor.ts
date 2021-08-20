import { Color } from '../base/Color.js';
import { TinyColor } from '../base/TinyColor.js';
import { root } from '../global.js';

export class DynamicColor {
        static colorfull1: Color;
        static colorfull2: Color;
        static colorfull3: Color;
        static schemeColor: Color;
        static highlightColor: Color;
        // SPECIFIC
        $squareImg?: JQuery<HTMLElement>;

        constructor() {
                this.$squareImg = $(".hero-image .square img");

                const colorScheme = getComputedStyle(root).getPropertyValue('--dui-color-scheme');
                const colorPrimary = getComputedStyle(root).getPropertyValue('--dui-color-primary');
                const color1 = getComputedStyle(root).getPropertyValue('--dui-color-1');
                const color2 = getComputedStyle(root).getPropertyValue('--dui-color-2');
                const color3 = getComputedStyle(root).getPropertyValue('--dui-color-3');

                DynamicColor.schemeColor = new TinyColor(colorScheme);
                DynamicColor.highlightColor = new TinyColor(colorPrimary);
                DynamicColor.colorfull1 = new TinyColor(color1);
                DynamicColor.colorfull2 = new TinyColor(color2);
                DynamicColor.colorfull3 = new TinyColor(color3);

                this.initColorPickers();
                this.setupColorPickerEvents();
        }

        private initColorPickers() {
                $("#scheme-color-picker").attr('value', DynamicColor.schemeColor.hex);
                $("#highlight-color-picker").attr('value', DynamicColor.highlightColor.hex);
                $("#colorfull1-picker").attr('value', DynamicColor.colorfull1.hex);
                $("#colorfull2-picker").attr('value', DynamicColor.colorfull2.hex);
                $("#colorfull3-picker").attr('value', DynamicColor.colorfull3.hex);
        }

        private setupColorPickerEvents() {
                $("#highlight-color-picker").on('input', (event) => {
                        const hexInput = (event.target as any).value;
                        this.updateColor(DynamicColor.highlightColor, hexInput, "--dui-color-primary")
                });
                $("#scheme-color-picker").on('input', (event) => {
                        const hexInput = (event.target as any).value;
                        this.updateColor(DynamicColor.schemeColor, hexInput, "--dui-color-scheme")
                });
                $("#colorfull1-picker").on('input', (event) => {
                        const hexInput = (event.target as any).value;
                        this.updateColor(DynamicColor.colorfull1, hexInput, "--dui-color-1")
                });
                $("#colorfull2-picker").on('input', (event) => {
                        const hexInput = (event.target as any).value;
                        this.updateColor(DynamicColor.colorfull2, hexInput, "--dui-color-2")
                });
                $("#colorfull3-picker").on('input', (event) => {
                        const hexInput = (event.target as any).value;
                        this.updateColor(DynamicColor.colorfull3, hexInput, "--dui-color-3")
                });
        }

        private updateColor(color: Color, hex: string, cssVar: string) {
                color.setHex(hex)
                root.style.setProperty(`${cssVar}`, color.hsl);
                root.style.setProperty(`${cssVar}-h`, color.hVal);
                root.style.setProperty(`${cssVar}-s`, color.sVal);
                root.style.setProperty(`${cssVar}-l`, color.lVal);
                root.style.setProperty(`${cssVar}-contrast-l`, color.getContrastL().toString());
        }
}