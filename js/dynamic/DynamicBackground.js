import { DynamicUI } from "./DynamicUI.js";
const BG_CLASS_SUFFIX = '-bg';
const CUSTOM_BG_CLASS = 'custom-bg';
const INNER_BG_SELECTOR = ".display-content>.container";
export class DynamicBackground {
  constructor() {
    /* although we select global bg for all UI styles, at the first time before doing that,
    each style can have its separate  preferred bg (e.g. glass-style w/ bg-3, neu-style w/o bg),
     only when we manually update  bg from setting panel, all styles are triggerd to use global bg instead of its preferred one. */
    this.updateGlobalOuterBgTriggered = false;
    this.updateGlobalInnerBgTriggered = false;
    // CAUTION: use arrow function for event handler in order to use "this"
    this.onSelectOuterBg = (event) => {
      if (!this.updateGlobalOuterBgTriggered)
        this.onFirstTimeSelectOuterBg();
      this.lastOuterBg = this.currentOuterBg;
      this.currentOuterBg = this.bgToClassName(event.target.textContent);
      if (this.lastOuterBg != this.currentOuterBg)
        this.onChangeOuterBg();
    };
    this.onSelectInnerBg = (event) => {
      if (!this.updateGlobalInnerBgTriggered)
        this.onFirstTimeSelectInnerBg();
      this.lastInnerBg = this.currentInnerBg;
      this.currentInnerBg = this.bgToClassName(event.target.textContent);
      if (this.lastInnerBg != this.currentInnerBg)
        this.onChangeInnerBg();
    };
    this.getDomElements();
    this.initOuterBg();
    this.initInnerBg();
    this.initDropdowns();
    this.setupEvents();
    // TODO: Toggle setting panel/button & scrollbar box-shadow according to current background so that does not look weird
  }
  getDomElements() {
    this.eDropdownLabelOuterBg = document.querySelector("#dropdown-outer-bg .dropdown-label");
    this.eDropdownLabelTextOuterBg = document.querySelector("#dropdown-outer-bg .dropdown-label p");
    this.eDropdownLabelInnerBg = document.querySelector("#dropdown-inner-bg .dropdown-label");
    this.eDropdownLabelTextInnerBg = document.querySelector("#dropdown-inner-bg .dropdown-label p");
    this.esInnerBgContainers = document.querySelectorAll(INNER_BG_SELECTOR);
  }
  initOuterBg() {
    var _a, _b;
    this.hasCustomBg = DynamicUI.$body.hasClass(CUSTOM_BG_CLASS);
    if (this.hasCustomBg) {
      this.currentOuterBg = CUSTOM_BG_CLASS;
      (_a = document.querySelector(`.setting-panel .${CUSTOM_BG_CLASS}`)) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    }
    else {
      this.currentOuterBg = (_b = DynamicUI.currentStyle) === null || _b === void 0 ? void 0 : _b.preferredOuterBg;
      DynamicUI.$body.addClass(this.currentOuterBg);
    }
  }
  initInnerBg() {
    var _a, _b;
    (_a = this.esInnerBgContainers) === null || _a === void 0 ? void 0 : _a.forEach((element) => {
      var _a;
      element.classList.add((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg);
    });
    this.currentInnerBg = (_b = DynamicUI.currentStyle) === null || _b === void 0 ? void 0 : _b.preferredInnerBg;
  }
  initDropdowns() {
    // add bg class name to according item
    document.querySelectorAll("#dropdown-outer-bg .dropdown-item, #dropdown-inner-bg .dropdown-item").forEach((element) => {
      const bgClassName = this.bgToClassName(element.textContent);
      element.classList.add(bgClassName);
    });
    this.updateDropdownLabels();
  }
  updateDropdownLabels() {
    this.updateOuterBgDropdownLabel();
    this.updateInnerBgDropdownLabel();
  }
  updateOuterBgDropdownLabel() {
    var _a;
    if (this.lastOuterBg)
      (_a = this.eDropdownLabelOuterBg) === null || _a === void 0 ? void 0 : _a.classList.remove(this.lastOuterBg);
    this.eDropdownLabelOuterBg.classList.add(this.currentOuterBg);
    this.eDropdownLabelTextOuterBg.textContent = this.classNameToBg(this.currentOuterBg);
  }
  updateInnerBgDropdownLabel() {
    var _a;
    if (this.lastInnerBg)
      (_a = this.eDropdownLabelInnerBg) === null || _a === void 0 ? void 0 : _a.classList.remove(this.lastInnerBg);
    this.eDropdownLabelInnerBg.classList.add(this.currentInnerBg);
    this.eDropdownLabelTextInnerBg.textContent = this.classNameToBg(this.currentInnerBg);
  }
  // HELPER
  bgToClassName(bgName) {
    return bgName.replace(' ', '-').toLowerCase() + BG_CLASS_SUFFIX;
  }
  // HELPER
  classNameToBg(className) {
    return this.capitalizeFirstLetter(className).replace(BG_CLASS_SUFFIX, '').replace('-', ' ');
  }
  // HELPER
  capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  onStyleUpdate() {
    if (!this.updateGlobalOuterBgTriggered)
      this.applyCurrentStyleOuterBg();
    if (!this.updateGlobalInnerBgTriggered)
      this.applyCurrentStyleInnerBg();
  }
  applyCurrentStyleOuterBg() {
    var _a, _b;
    if (this.currentOuterBg == ((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredOuterBg))
      return;
    //TODO: handle custom bg case -  if (!this.hasCustomBg) 
    this.lastOuterBg = this.currentOuterBg;
    this.currentOuterBg = (_b = DynamicUI.currentStyle) === null || _b === void 0 ? void 0 : _b.preferredOuterBg;
    this.onChangeOuterBg();
  }
  applyCurrentStyleInnerBg() {
    var _a, _b;
    if (this.currentInnerBg == ((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg))
      return;
    this.lastInnerBg = this.currentInnerBg;
    this.currentInnerBg = (_b = DynamicUI.currentStyle) === null || _b === void 0 ? void 0 : _b.preferredInnerBg;
    this.onChangeInnerBg();
  }
  setupEvents() {
    var _a, _b;
    (_a = document.querySelectorAll('#dropdown-outer-bg .dropdown-item')) === null || _a === void 0 ? void 0 : _a.forEach(element => {
      element.addEventListener('click', this.onSelectOuterBg);
    });
    (_b = document.querySelectorAll('#dropdown-inner-bg .dropdown-item')) === null || _b === void 0 ? void 0 : _b.forEach(element => {
      element.addEventListener('click', this.onSelectInnerBg);
    });
  }
  onFirstTimeSelectOuterBg() {
    var _a, _b;
    this.updateGlobalOuterBgTriggered = true;
    // TODO: ad-hoc solution in case use PagePiling and load section dynamically after page load, 
    // therefore all elements with innerBgSelector are not set currentInnerBg yet
    (_a = this.esInnerBgContainers) === null || _a === void 0 ? void 0 : _a.forEach((element) => {
      element.classList.add(this.currentInnerBg);
    });
    // remove custom & preferred  bg also 
    DynamicUI.$body.removeClass(CUSTOM_BG_CLASS);
    DynamicUI.$body.removeClass((_b = DynamicUI.currentStyle) === null || _b === void 0 ? void 0 : _b.preferredOuterBg);
  }
  onChangeOuterBg() {
    DynamicUI.$body.removeClass(this.lastOuterBg);
    DynamicUI.$body.addClass(this.currentOuterBg);
    this.updateOuterBgDropdownLabel();
  }
  onFirstTimeSelectInnerBg() {
    this.updateGlobalInnerBgTriggered = true;
    this.esInnerBgContainers.forEach((element) => {
      var _a;
      element.classList.remove((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg);
      // hide default bgColor to see new bg
      element.style.backgroundColor = 'transparent';
    });
  }
  onChangeInnerBg() {
    this.esInnerBgContainers.forEach((element) => {
      element.classList.remove(this.lastInnerBg);
      element.classList.add(this.currentInnerBg);
    });
    this.updateInnerBgDropdownLabel();
  }
}
