import { StyleName } from '../Config.js';
export abstract class Style {
        private styleSheet?: CSSStyleSheet;
        private cssRules?: CSSRuleList;
        name: StyleName;
        // preffered properies are applied to a style at the first time, 
        //util we update the property for global from setting panel
        preferredBg: string;

        constructor(name: StyleName, preferredBg?: string) {
                this.styleSheet = this.createStyleSheet();
                this.cssRules = this.styleSheet.cssRules || this.styleSheet.rules;
                this.name = name;
                this.preferredBg = preferredBg ?? 'background-0';
        }

        private createStyleSheet(): CSSStyleSheet {
                var style = document.createElement("style");
                document.head.appendChild(style);
                return style.sheet!;
        }

        protected insertEmptyRule = (selectors: string[]): CSSStyleRule => this.cssRules![this.styleSheet!.insertRule(`${this.formatSelectorsArray(selectors)} {}`)] as CSSStyleRule;

        private formatSelectorsArray(array: string[]): string {
                return array.map(selector => `.${this.name} ${selector}`).join(", ");
                // return array.join(", ");
        }

        onEnable(): void {
                this.init();
                this.setupCustomizeEvents();
        };
        abstract setupCustomizeEvents(): void; // events for customize the style in the setting panel
        abstract init(): void;

        abstract onDisable(): void;

        // DRY: update common functions, e.g. bgScheme, bgHighlight....
        abstract onHighlightColorUpdated(): void;
        abstract onSchemeColorUpdated(): void;
        abstract onBaseColorUpdated(): void;
}

