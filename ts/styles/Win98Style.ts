import { Style } from '../base/Style.js';
import *as Win98Seletors from '../selectors/Win98Seletors.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { Win98Config } from '../StyleConfig.js';

export class Win98Style extends Style {
        private static _instance: Win98Style = new Win98Style();
        private constructor() { super(Win98Config) }
        public static get Instance(): Win98Style {
                Win98Style._instance ??= new Win98Style();
                return Win98Style._instance;
        }

        private bgSchemeRule?: CSSStyleRule;
        getBgSchemeRule = () => this.bgSchemeRule ?? (this.bgSchemeRule = this.insertEmptyRule(Win98Seletors.bgSchemeSelectors));

        setupCustomizeEvents(): void {
        }

        init(): void {
        }

        onDisable(): void {
        }

        onHighlightColorUpdated(): void {
        }

        onSchemeColorUpdated(): void {
                this.getBgSchemeRule().style.setProperty('background-color', DynamicColor.schemeColor!.hex);
        }

        onBaseColorUpdated(): void {
        }
}