import { Style } from '../base/Style.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { FlatConfig } from '../StyleConfig.js';

export class Template extends Style {
  private static _instance: Template = new Template();
  // change this
  private constructor() { super(FlatConfig) }
  public static get Instance(): Template {
    Template._instance ??= new Template();
    return Template._instance;
  }

  setupCustomizeEvents(): void { }

  init(): void { }

  onDisable(): void { }

  onHighlightColorUpdated(): void { }

  onSchemeColorUpdated(): void { }

  onBaseColorUpdated(): void { }
}