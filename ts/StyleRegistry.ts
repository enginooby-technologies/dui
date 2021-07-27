/* 
Responsibility: manage, load all styles & initialize current style of the theme
Reason to change: add/remove a style, change the first style
*/
import { changeStyle } from "./DynamicTheme.js";
import { FlatStyle } from "./styles/FlatStyle.js";
import { NeuStyle } from "./styles/NeuStyle.js";
import { GlassStyle } from "./styles/GlassStyle.js";
import { NesStyle } from "./styles/NesStyle.js";

const FLAT_OPTION_SELECTOR: string = '#flat-skin-button';
const NES_OPTION_SELECTOR: string = '#nes-skin-button';
const NEU_OPTION_SELECTOR: string = '#neu-skin-button';
const GLASS_OPTION_SELECTOR: string = '#glass-skin-button';

export class StyleRegistry {
        constructor() {
                this.init();
                // changeStyle(GlassStyle.Instance);
                // $(GLASS_OPTION_SELECTOR).children('.button').addClass('active');
                changeStyle(NeuStyle.Instance);
                $(NEU_OPTION_SELECTOR).addClass('active');
                // changeStyle(NesStyle.Instance);
                // $(NES_OPTION_SELECTOR).children('.button').addClass('active');
                // changeStyle(FlatStyle.Instance);
                // $(FLAT_OPTION_SELECTOR).children('.button').addClass('active');
        }

        public init() {
                "use strict";
                $(FLAT_OPTION_SELECTOR).on('click', function () {
                        changeStyle(FlatStyle.Instance);
                });
                $(NEU_OPTION_SELECTOR).on('click', function () {
                        changeStyle(NeuStyle.Instance);
                });
                $(NES_OPTION_SELECTOR).on('click', function () {
                        changeStyle(NesStyle.Instance);
                });
                $(GLASS_OPTION_SELECTOR).on('click', function () {
                        changeStyle(GlassStyle.Instance);
                });
        }
}