import { Style } from '../base/Style.js';
import { FlatConfig } from '../StyleConfig.js';

export class FlatStyle extends Style {
  // Singleton Pattern
  private static _instance: FlatStyle;
  private constructor() { super(FlatConfig) }
  public static get Instance(): FlatStyle {
    FlatStyle._instance ??= new FlatStyle();
    return FlatStyle._instance;
  }

  schemeDistinctIntensity?: number;
  primaryDistinctIntensity?: number;

  init() { }
  setupCustomizeEvents() { }

  onHighlightColorUpdated(): void {
  }

  onSchemeColorUpdated(): void {
  }
}