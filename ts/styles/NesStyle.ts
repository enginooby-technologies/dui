import { Style } from '../base/Style.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { NesConfig } from '../StyleConfig.js';

export class NesStyle extends Style {
  //  Singleton Pattern
  private static _instance: NesStyle = new NesStyle();
  private constructor() { super(NesConfig) }
  public static get Instance(): NesStyle {
    NesStyle._instance ??= new NesStyle();
    return NesStyle._instance;
  }

  // param: border style
  // border-image - repeat: space;
  // border - image - repeat: stretch;

  //param: border width

  darkHighlightIntensity: number = 15;
  darkenHighlightColor: string = "#033669";
  borderInput: string = "";

  private bgDarkenHighlightRule?: CSSStyleRule;
  // getBgDarkenHighlightRule = () => this.bgDarkenHighlightRule ?? (this.bgDarkenHighlightRule = insertEmptyRule(NesSelectors.bgDarkenHighlightSelectors));
  private borderInputRule?: CSSStyleRule;
  // getBorderInputRule = () => this.borderInputRule ?? (this.borderInputRule = insertEmptyRule(NesSelectors.borderInputSelectors));

  setupCustomizeEvents(): void {
  }

  init(): void {
  }
  onHighlightColorUpdated(): void {
    this.darkenHighlightColor = DynamicColor.highlightColor!.getDarken(this.darkHighlightIntensity);
    // this.getBgDarkenHighlightRule().style.setProperty('background-color', this.darkenHighlightColor, 'important');
  }

  onBaseColorUpdated(): void {
    this.updateBorderColor();
    // this.getBorderInputRule().style.setProperty('border-image-source', this.borderInput);
  }

  updateBorderColor() {
    const borderRgb = (DynamicColor.baseColor == '#ffffff') ? "rgb(255,255,255)" : "rgb(0,0,0)";
    this.borderInput = `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="${borderRgb}" /></svg>')`;
  }
}