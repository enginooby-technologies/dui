// import WebFont from "webfontloader";
import { insertEmptyRule } from '../global.js';
import * as DynamicSelectors from '../selectors/DynamicSelectors.js';
import { DynamicUI } from "./DynamicUI.js";

class FontPreset {
  constructor(
    public fontFamily: string,
    public scale: number,
    public lineHeight: number,
    public letterSpacing: number,
    public fallbackFonts: string = ""
  ) { }
}

// TODO: cache all selectors
export class DynamicFont {
  fontPresets: FontPreset[] = [];
  previousFontPreset?: FontPreset;
  currentFontPreset: FontPreset;

  downloadedFontFamilies: string[] = ["Agency FB"]; // initialize with local fonts
  $dropdownLabelFontFamily: JQuery<HTMLElement>;
  fontRule?: CSSStyleRule;
  getFontRule = () => this.fontRule ?? (this.fontRule = insertEmptyRule(DynamicSelectors.fontSelectors));
  fontScaleRule?: CSSStyleRule;
  getFontScaleRule = () => this.fontScaleRule ?? (this.fontScaleRule = insertEmptyRule(DynamicSelectors.fontScaleSelectors));

  initialFontSizes = new Map<CSSStyleRule, number>();

  constructor() {
    this.fontPresets = [
      new FontPreset('Agency FB', 1, 1.45, 1),
      new FontPreset('Ubuntu', 0.8, 1.4, 0.5),
      new FontPreset('Style Script', 1, 1.45, 2.3),
      new FontPreset('BioRhyme', 0.81, 1.35, -8.3),
      new FontPreset('Roboto', 0.96, 1.25, -5.3),
      new FontPreset('Special Elite', 0.84, 1.45, -7),
      new FontPreset('Press Start 2P', 0.58, 1.6, -10, ', cursive'),
    ];
    this.currentFontPreset = this.fontPresets[0];
    this.previousFontPreset = this.fontPresets[0];
    this.$dropdownLabelFontFamily = $("#dropdown-font-family .dropdown-label p");
    this.setRangeSliderValue("#range-slider_letter-spacing", this.currentFontPreset.letterSpacing);
    this.setRangeSliderValue("#range-slider_size-scale", this.currentFontPreset.scale);
    this.setRangeSliderValue("#range-slider_line-height", this.currentFontPreset.lineHeight);
    this.applyFontPreset(this.currentFontPreset);
    this.setupEvents();
  }

  private applyFontPreset(fontPreset: FontPreset) {
    this.currentFontPreset = fontPreset;
    DynamicUI.$body?.removeClass(this.formatFontFamily(this.previousFontPreset?.fontFamily!));
    DynamicUI.$body?.addClass(this.formatFontFamily(this.currentFontPreset.fontFamily));
    if (this.previousFontPreset?.letterSpacing != this.currentFontPreset.letterSpacing) {
      this.setRangeSliderValue("#range-slider_letter-spacing", this.currentFontPreset.letterSpacing);
      this.updateLetterSpacing();
    }
    if (this.previousFontPreset?.lineHeight != this.currentFontPreset.lineHeight) {
      this.setRangeSliderValue("#range-slider_letter-spacing", this.currentFontPreset.letterSpacing);
      this.updateLineHeight();
    }

    if (this.previousFontPreset?.scale != this.currentFontPreset.scale) {
      this.setRangeSliderValue("#range-slider_size-scale", this.currentFontPreset.scale);
      this.updateSizeScale();
    }
  }

  // format to class name (Foo Bar->foo-bar-font) which is added to <body> 
  //so that each project customize things based on current font
  private formatFontFamily(fontFamily: string) {
    return fontFamily.replace(' ', '-').toLowerCase() + '-font';
  }

  //HELPER
  setRangeSliderValue(selector: string, value: number) {
    const $slider = $(selector);
    $slider.attr('value', value);
    $slider.next('.range-slider__value').html(value.toString());
  }

  private setupEvents() {
    $("#dropdown-font-family .dropdown-item").each((index, element) => {
      $(element).on("click", (event) => {
        const fontName = $(element).text();
        this.loadThenApplyFontFamily(fontName);
      })
    })

    $("#font-panel ,range-slider input").on('input', (event) => {
      const newValue = (event.target as HTMLInputElement).value;
      $("#" + event.target.id).next('.range-slider__value').text(newValue);
      switch (event.target.id) {
        case 'range-slider_line-height':
          this.currentFontPreset.lineHeight = parseFloat(newValue);
          this.updateLineHeight();
          break;
        case 'range-slider_letter-spacing':
          this.currentFontPreset.letterSpacing = parseFloat(newValue);
          this.updateLetterSpacing();
          break;
        case 'range-slider_size-scale':
          this.currentFontPreset.scale = parseFloat(newValue);
          this.updateSizeScale();
      }
    });
  }

  public loadThenApplyFontFamily(fontFamily: string) {
    this.$dropdownLabelFontFamily.text(fontFamily);
    if (this.downloadedFontFamilies.includes(fontFamily)) {
      this.applyFontFamily(fontFamily);
    } else {
      this.downloadFont(fontFamily);
    }
  }

  private downloadFont(fontFamily: string) {
    // @ts-ignore
    WebFont.load({
      google: {
        families: [fontFamily],
      },
      timeout: 2000,
      active: () => {
        this.downloadedFontFamilies.push(fontFamily);
        this.applyFontFamily(fontFamily);
      },
      inactive: () => { }
    });
  }

  private applyFontFamily(fontFamily: string) {
    let preset: FontPreset | null = this.getFontPresetByFamily(fontFamily);
    if (!preset) {
      preset = new FontPreset(fontFamily, 1, 1.45, 1);
      this.fontPresets.push(preset);
    }
    this.previousFontPreset = this.currentFontPreset;
    this.currentFontPreset = preset;
    this.getFontRule().style.setProperty('font-family', `'${preset.fontFamily}' ${preset.fallbackFonts}`, 'important');
    this.applyFontPreset(this.currentFontPreset);
  }

  private getFontPresetByFamily(fontFamily: string): FontPreset | null {
    for (let i = 0; i < this.fontPresets.length; i++) {
      if (this.fontPresets[i].fontFamily == fontFamily) {
        return this.fontPresets[i];
      }
    }
    return null;
  }

  private updateSizeScale() {
    this.getFontScaleRule().style.setProperty('zoom', this.currentFontPreset.scale.toString());
  }

  private updateLetterSpacing() {
    this.getFontRule().style.setProperty('letter-spacing', `${this.currentFontPreset.letterSpacing / 100}rem`, 'important');
  }

  private updateLineHeight() {
    this.getFontRule().style.setProperty('line-height', this.currentFontPreset.lineHeight.toString());
  }
}