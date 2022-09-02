import { Style } from '../base/Style.js';
import { DragDropExt } from '../extensions/DragDropExt.js';
import { root } from "../global.js";
import * as Loader from "../loader.js";
import * as Ref from "../references.js";
import { StyleRegistry } from '../StyleRegistry.js';
import { DynamicBackground } from './DynamicBackground.js';
import { DynamicColor } from './DynamicColor.js';
import { DynamicFont } from './DynamicFont.js';

export class DynamicUI {
  dynamicColor?: DynamicColor;
  dynamicFont?: DynamicFont;
  dynamicBackground?: DynamicBackground;
  static currentStyle?: Style;

  private $borderRadiusSlider?: JQuery<HTMLElement>;
  private $borderValueLabel?: JQuery<HTMLElement>;

  // TODO: cache all jQuery selectors
  static $body?: JQuery<HTMLElement>; //outer background

  public setCurrentStyle(newStyle: Style) {
    DynamicUI.currentStyle?.onDisable();
    DynamicUI.$body!.removeClass(DynamicUI.currentStyle?.name);

    DynamicUI.currentStyle = newStyle;
    DynamicUI.$body!.addClass(DynamicUI.currentStyle.name);
    $(".customizer").hide();
    DynamicUI.currentStyle.onEnable();

    // update dynamic components
    if (DynamicUI.currentStyle.fontFamily) {
      this.dynamicFont?.loadThenApplyFontFamily(DynamicUI.currentStyle.fontFamily);
    }

    // this.$borderRadiusSlider!.attr('value', DynamicUI.currentStyle.borderRadius!.toString());
    this.setBorderRadius(DynamicUI.currentStyle.borderRadius!.toString());

    this.dynamicBackground?.onStyleUpdate();
    // this.dynamicColor?.updateChangesFromLastStyle();
  }

  constructor() {
    DynamicUI.$body = $('body');

    this.setupSettingPanel();

    // get init class "...-style" from body
    const initStyleName = DynamicUI.$body!.attr('class')!.match(/\S*-style\b/i)?.toString();
    new StyleRegistry(this, initStyleName);

    this.dynamicColor = new DynamicColor();
    this.dynamicBackground = new DynamicBackground();
    this.enableDynamicFont();
    // this.enableDragDropExtension();
  }

  private enableDynamicFont() {
    Loader.tryLoadScript(Ref.webfontJs, () => {
      this.dynamicFont = new DynamicFont();
      if (DynamicUI.currentStyle?.fontFamily) {
        this.dynamicFont?.loadThenApplyFontFamily(DynamicUI.currentStyle.fontFamily);
      }
    })
  }

  private enableDragDropExtension() {
    Loader.tryLoadScript(Ref.interactMinJs, () => {
      new DragDropExt();
    })
  }

  private setupSettingPanel() {
    $('.theme-skin.radio-button-group .button').on('click', event => {
      $('.theme-skin.radio-button-group .button').removeClass('active');
      $(event.currentTarget).addClass('active')
    });

    this.setupRangeSliders();
  }

  /* DYNAMIC BORDER */
  private setupRangeSliders() {
    this.$borderRadiusSlider = $('#border-radius');
    this.$borderValueLabel = this.$borderRadiusSlider.next('.range-slider__value');
    const initialBorderRadius = 9;

    // this.$borderRadiusSlider.attr('value', initialBorderRadius);
    this.$borderValueLabel.html(initialBorderRadius.toString());
    this.$borderRadiusSlider.on('input', (event) => {
      const newValue = (event.target as HTMLInputElement).value;
      this.setBorderRadius(newValue);
    });
  }

  private setBorderRadius(value: string) {
    this.$borderValueLabel!.text(value);
    this.$borderRadiusSlider!.attr('value', value);
    root.style.setProperty('--dui-border-radius', value + 'px');
  }
}

// CONSIDER: where to put this
new DynamicUI();
