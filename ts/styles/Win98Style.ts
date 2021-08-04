import { Style } from '../base/Style.js';
import { StyleName } from '../Config.js';
import { DynamicColor } from '../DynamicColor.js';

export class Win98Style extends Style {
        private static _instance: Win98Style = new Win98Style();
        private constructor() { super(StyleName.Win98, 'windows98-bg', 'none-bg') }
        public static get Instance(): Win98Style {
                Win98Style._instance ??= new Win98Style();
                return Win98Style._instance;
        }

        setupCustomizeEvents(): void {
        }

        init(): void {
        }

        onDisable(): void {
        }

        onHighlightColorUpdated(): void {
        }

        onSchemeColorUpdated(): void {
        }

        onBaseColorUpdated(): void {
        }
}