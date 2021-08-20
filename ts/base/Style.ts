import { insertEmptyRule } from '../global.js';
import { StyleConfig } from '../StyleConfig.js';

export abstract class Style {
  name: string;
  // preffered properies are applied to a style at the first time, 
  //util we update the property for global from setting panel
  preferredOuterBg: string;
  preferredInnerBg: string;
  preferredFontFamily?: string;
  cssRule: CSSStyleRule; // to change its CSS custom properties

  constructor(styleConfig: StyleConfig) {
    this.name = styleConfig.name;
    this.preferredOuterBg = styleConfig.outerBackground ?? 'none-bg';
    this.preferredInnerBg = styleConfig.innerBackground ?? 'none-bg';
    this.preferredFontFamily = styleConfig.font;
    this.cssRule = insertEmptyRule('.' + styleConfig.name)
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

