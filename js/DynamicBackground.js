import { DynamicUI } from "./DynamicUI.js";
export class DynamicBackground {
    constructor() {
        var _a, _b;
        // TODO: find a way to cache $(innerBgSelector)
        this.innerBgSelector = ".display-content>.container"; // inner background, default is the scheme color
        this.customBgClassName = "custom-bg";
        // although we select global bg for all UI styles, at the first time before doing that, 
        // each style can have its separate  preferred bg (e.g. glass-style w/ bg-3, neu-style w/o bg),
        // only when we manually update  bg from setting panel, all styles are triggerd to use global bg instead of its preferred one.
        this.updateGlobalOuterBgTriggered = false;
        this.updateGlobalInnerBgTriggered = false;
        this.getDomElements();
        this.hasCustomBg = DynamicUI.$body.hasClass(this.customBgClassName);
        if (this.hasCustomBg) {
            this.currentOuterBg = this.customBgClassName;
            $(`.setting-panel .${this.customBgClassName}`).removeClass('hide');
        }
        else {
            this.currentOuterBg = (_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredOuterBg;
            DynamicUI.$body.addClass(this.currentOuterBg);
        }
        $(this.innerBgSelector).each((index, element) => {
            var _a;
            element.classList.add((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg);
        });
        this.currentInnerBg = (_b = DynamicUI.currentStyle) === null || _b === void 0 ? void 0 : _b.preferredInnerBg;
        // TODO: Toggle setting panel/button & scrollbar box-shadow according to current background so that does not look weird
        this.initDropdowns();
        this.setupEvents();
    }
    getDomElements() {
        this.$dropdownLabelOuterBg = $("#dropdown-outer-bg .dropdown-label");
        this.$dropdownLabelTextOuterBg = $("#dropdown-outer-bg .dropdown-label p");
        this.$dropdownLabelInnerBg = $("#dropdown-inner-bg .dropdown-label");
        this.$dropdownLabelTextInnerBg = $("#dropdown-inner-bg .dropdown-label p");
    }
    initDropdowns() {
        // add bg class name to according item
        $("#dropdown-outer-bg .dropdown-item, #dropdown-inner-bg .dropdown-item").each((index, element) => {
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
            (_a = this.$dropdownLabelOuterBg) === null || _a === void 0 ? void 0 : _a.removeClass(this.lastOuterBg);
        this.$dropdownLabelOuterBg.addClass(this.currentOuterBg);
        this.$dropdownLabelTextOuterBg.text(this.classNameToBg(this.currentOuterBg));
    }
    updateInnerBgDropdownLabel() {
        var _a;
        if (this.lastInnerBg)
            (_a = this.$dropdownLabelInnerBg) === null || _a === void 0 ? void 0 : _a.removeClass(this.lastInnerBg);
        this.$dropdownLabelInnerBg.addClass(this.currentInnerBg);
        this.$dropdownLabelTextInnerBg.text(this.classNameToBg(this.currentInnerBg));
    }
    bgToClassName(bgName) {
        return bgName.replace(' ', '-').toLowerCase() + '-bg';
    }
    classNameToBg(className) {
        return this.capitalizeFirstLetter(className).replace('-bg', '').replace('-', ' ');
    }
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
        this.applyCurrentOuterBg();
    }
    applyCurrentOuterBg() {
        DynamicUI.$body.removeClass(this.lastOuterBg);
        DynamicUI.$body.addClass(this.currentOuterBg);
        this.updateOuterBgDropdownLabel();
    }
    applyCurrentStyleInnerBg() {
        var _a, _b;
        if (this.currentInnerBg == ((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg))
            return;
        this.lastInnerBg = this.currentInnerBg;
        this.currentInnerBg = (_b = DynamicUI.currentStyle) === null || _b === void 0 ? void 0 : _b.preferredInnerBg;
        this.applyCurrentInnerBg();
    }
    applyCurrentInnerBg() {
        $(this.innerBgSelector).each((index, element) => {
            element.classList.remove(this.lastInnerBg);
            element.classList.add(this.currentInnerBg);
        });
        this.updateInnerBgDropdownLabel();
    }
    setupEvents() {
        this.setupOuterBgEvent();
        this.setupInnerBgEvent();
    }
    setupOuterBgEvent() {
        $('#dropdown-outer-bg .dropdown-item').on('click', (event) => {
            if (!this.updateGlobalOuterBgTriggered)
                this.onFirstTimeSelectOuterBg();
            this.lastOuterBg = this.currentOuterBg;
            this.currentOuterBg = this.bgToClassName(event.currentTarget.textContent);
            if (this.lastOuterBg != this.currentOuterBg)
                this.applyCurrentOuterBg();
        });
    }
    onFirstTimeSelectOuterBg() {
        var _a;
        this.updateGlobalOuterBgTriggered = true;
        // TODO: ad-hoc solution in case use PagePiling and load section dynamically after page load, 
        // therefore all elements with innerBgSelector are not set currentInnerBg yet
        $(this.innerBgSelector).each((index, element) => {
            element.classList.add(this.currentInnerBg);
        });
        // remove custom & preferred  bg also
        DynamicUI.$body.removeClass(this.customBgClassName);
        DynamicUI.$body.removeClass((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredOuterBg);
    }
    setupInnerBgEvent() {
        $('#dropdown-inner-bg .dropdown-item').on('click', (event) => {
            // first time  select inner  bg 
            if (!this.updateGlobalInnerBgTriggered)
                this.onFirstTimeSelectInnerBg();
            this.lastInnerBg = this.currentInnerBg;
            this.currentInnerBg = this.bgToClassName(event.currentTarget.textContent);
            if (this.lastInnerBg != this.currentInnerBg)
                this.applyCurrentInnerBg();
        });
    }
    onFirstTimeSelectInnerBg() {
        this.updateGlobalInnerBgTriggered = true;
        $(this.innerBgSelector).each((index, element) => {
            var _a;
            element.classList.remove((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg);
            // hide default bgColor to see new bg
            element.style.backgroundColor = 'transparent';
        });
    }
}
