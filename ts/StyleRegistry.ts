/* 
Responsibility: manage, load all styles & initialize current style of the theme
Reason to change: add/remove a style, change the first style
*/
import { FlatStyle } from "./styles/FlatStyle.js";
import { NeuStyle } from "./styles/NeuStyle.js";
import { GlassStyle } from "./styles/GlassStyle.js";
import { NesStyle } from "./styles/NesStyle.js";
import { StyleName } from "./Config.js";
import { DynamicUI } from "./DynamicUI.js";

const FLAT_OPTION_SELECTOR: string = '#flat-skin-button';
const NES_OPTION_SELECTOR: string = '#nes-skin-button';
const NEU_OPTION_SELECTOR: string = '#neu-skin-button';
const GLASS_OPTION_SELECTOR: string = '#glass-skin-button';

export class StyleRegistry {
        private dynamicUI: DynamicUI;
        constructor(dynamicUI: DynamicUI, initSytle: string = StyleName.Neu) {
                this.dynamicUI = dynamicUI;
                this.init();
                switch (initSytle) {
                        case StyleName.Flat:
                                this.dynamicUI.changeStyle(FlatStyle.Instance);
                                $(FLAT_OPTION_SELECTOR).children('.button').addClass('active');
                                break;
                        case StyleName.Neu:
                                this.dynamicUI.changeStyle(NeuStyle.Instance);
                                $(NEU_OPTION_SELECTOR).addClass('active');
                                break;
                        case StyleName.Glass:
                                this.dynamicUI.changeStyle(GlassStyle.Instance);
                                $(GLASS_OPTION_SELECTOR).addClass('active');
                                break;
                        default:
                                this.dynamicUI.changeStyle(NeuStyle.Instance);
                                $(NEU_OPTION_SELECTOR).addClass('active');
                                break;
                }
                // changeStyle(NesStyle.Instance);
                // $(NES_OPTION_SELECTOR).children('.button').addClass('active');
        }

        public init() {
                "use strict";
                $(FLAT_OPTION_SELECTOR).on('click', () => {
                        this.dynamicUI.changeStyle(FlatStyle.Instance);
                });
                $(NEU_OPTION_SELECTOR).on('click', () => {
                        this.dynamicUI.changeStyle(NeuStyle.Instance);
                });
                $(NES_OPTION_SELECTOR).on('click', () => {
                        this.dynamicUI.changeStyle(NesStyle.Instance);
                });
                $(GLASS_OPTION_SELECTOR).on('click', () => {
                        this.dynamicUI.changeStyle(GlassStyle.Instance);
                });
        }
}