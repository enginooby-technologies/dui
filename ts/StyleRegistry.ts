/* 
Responsibility: manage, load all styles & initialize current style of the theme
Reason to change: add/remove a style, change the first style
*/
import { FlatStyle } from "./styles/FlatStyle.js";
import { NeuStyle } from "./styles/NeuStyle.js";
import { GlassStyle } from "./styles/GlassStyle.js";
import { StyleName } from "./Config.js";
import { DynamicUI } from "./DynamicUI.js";
import { Style } from "./base/Style.js";
import { NesStyle } from "./styles/NesStyle.js";

export class StyleRegistry {
        private dynamicUI: DynamicUI;
        private $uiStyleDropdownLabel: JQuery<HTMLElement>;

        constructor(dynamicUI: DynamicUI, initStyle: string = StyleName.Neu) {
                this.dynamicUI = dynamicUI;
                this.$uiStyleDropdownLabel = $(`#dropdown-ui-style .dropdown-label`);
                const styleFullname = $(`#dropdown-ui-style .dropdown-item[value=${initStyle}`).text();
                this.$uiStyleDropdownLabel.text(styleFullname);
                this.setupEvents();
                this.dynamicUI.setCurrentStyle(this.getStyleInstanceByName(initStyle));
        }

        private setupEvents() {
                "use strict";
                $("#dropdown-ui-style .dropdown-item").each((index, element) => {
                        $(element).on("click", (event) => {
                                const styleName = $(element).attr("value")!;
                                const optionLabel = $(element).text();
                                this.$uiStyleDropdownLabel.text(optionLabel);
                                this.dynamicUI.setCurrentStyle(this.getStyleInstanceByName(styleName));
                        })
                })
        }

        private getStyleInstanceByName(name: string): Style {
                // DR
                if (name == StyleName.Flat) return FlatStyle.Instance;
                if (name == StyleName.Neu) return NeuStyle.Instance;
                if (name == StyleName.Glass) return GlassStyle.Instance;
                if (name == StyleName.Nes) return NesStyle.Instance;

                throw Error("Style instance not found!");
        }
}