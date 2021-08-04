import { Style } from '../base/Style.js';
import { StyleName } from '../Config.js';
import { DynamicColor } from '../DynamicColor.js';

export class Template extends Style {
        private static _instance: Template = new Template();
        // change this
        private constructor() { super(StyleName.Nes, 'wintery-sunburst-bg', 'none-bg', 'Press Start 2P') }
        public static get Instance(): Template {
                Template._instance ??= new Template();
                return Template._instance;
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