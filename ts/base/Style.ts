import { insertEmptyRule } from '../global.js';
import { StyleConfig } from '../StyleConfig.js';

export abstract class Style {
  name: string;
  cssRule: CSSStyleRule; // to change its CSS custom properties

  // preffered properies are applied to a style at the first time, util we update the property for global from setting panel
  outerBg: string;
  innerBg: string;
  fontFamily?: string;
  borderRadius?: number;

  constructor(config: StyleConfig) {
    this.name = config.name;
    this.outerBg = config.defaultOuterBackground ?? 'none-bg';
    this.innerBg = config.defaultInnerBackground ?? 'none-bg';
    this.fontFamily = config.defaultFont;
    this.borderRadius = config.defaultBorderRadius ?? 9;
    this.cssRule = insertEmptyRule('.' + config.name)
  }

  onEnable(): void {
    this.init();
    this.setupCustomizeEvents();
  };
  // events for customize the style-specific properties in the setting panel
  abstract setupCustomizeEvents(): void;
  abstract init(): void;
  onDisable() { };

  onHighlightColorUpdated() { };
  onSchemeColorUpdated() { };
  onBaseColorUpdated() { };
}

