import { Style } from "./base/Style.js";
import { FlatStyle } from "./styles/FlatStyle.js";
import { NeuStyle } from "./styles/NeuStyle.js";
import { GlassStyle } from "./styles/GlassStyle.js";
import { NesStyle } from "./styles/NesStyle.js";
import { Win98Style } from "./styles/Win98Style.js";
import { FlatConfig, GlassConfig, NesConfig, NeuConfig, Win98Config, WinXPConfig } from "./StyleConfig.js";
import { DynamicUI } from "./dynamic/DynamicUI.js";
import { WinXPStyle } from "./styles/WinXPStyle.js";

export class StyleRegistry {
  private dynamicUI: DynamicUI;
  private $uiStyleDropdownLabel: JQuery<HTMLElement>;

  constructor(dynamicUI: DynamicUI, initStyle: string = NeuConfig.name) {
    this.dynamicUI = dynamicUI;
    this.$uiStyleDropdownLabel = $(`#dropdown-ui-style .dropdown-label p`);
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
    // DRY
    if (name == FlatConfig.name) return FlatStyle.Instance;
    if (name == NeuConfig.name) return NeuStyle.Instance;
    if (name == GlassConfig.name) return GlassStyle.Instance;
    if (name == NesConfig.name) return NesStyle.Instance;
    if (name == Win98Config.name) return Win98Style.Instance;
    if (name == WinXPConfig.name) return WinXPStyle.Instance;

    throw Error("Style instance not found!");
  }
}