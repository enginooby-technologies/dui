import { Style } from '../base/Style.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { WinXPConfig } from '../StyleConfig.js';

export class WinXPStyle extends Style {
        private static _instance: WinXPStyle = new WinXPStyle();
        private constructor() { super(WinXPConfig) }
        public static get Instance(): WinXPStyle {
                WinXPStyle._instance ??= new WinXPStyle();
                return WinXPStyle._instance;
        }

        setupCustomizeEvents(): void { }

        init(): void { }

        onDisable(): void { }

        onHighlightColorUpdated(): void { }

        onSchemeColorUpdated(): void { }

        onBaseColorUpdated(): void { }
}