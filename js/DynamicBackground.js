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
        this.$body = $('body');
        this.$dropdownLabelOuterBg = $("#dropdown-outer-bg .dropdown-label");
        this.$dropdownLabelTextOuterBg = $("#dropdown-outer-bg .dropdown-label p");
        this.$dropdownLabelInnerBg = $("#dropdown-inner-bg .dropdown-label");
        this.$dropdownLabelTextInnerBg = $("#dropdown-inner-bg .dropdown-label p");
        this.hasCustomBg = this.$body.hasClass(this.customBgClassName);
        if (this.hasCustomBg) {
            this.currentOuterBg = this.customBgClassName;
            $(`.setting-panel .${this.customBgClassName}`).removeClass('hide');
        }
        if (!this.hasCustomBg) {
            this.currentOuterBg = (_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredOuterBg;
            this.$body.addClass(this.currentOuterBg);
        }
        // TOFIX: not cover all elements if loading them dynamically after page load
        $(this.innerBgSelector).each((index, element) => {
            var _a;
            element.classList.add((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg);
        });
        this.currentInnerBg = (_b = DynamicUI.currentStyle) === null || _b === void 0 ? void 0 : _b.preferredInnerBg;
        // TODO: Toggle setting panel/button & scrollbar box-shadow according to current background so that does not look weird
        this.initDropdowns();
        this.setupEvents();
    }
    initDropdowns() {
        // add bg class name to according item
        $("#dropdown-outer-bg .dropdown-item, #dropdown-inner-bg .dropdown-item").each((index, element) => {
            const bgClassName = this.bgToClassName(element.textContent);
            element.classList.add(bgClassName);
        });
        //update current bgs to dropdowns
        this.$dropdownLabelOuterBg.addClass(this.currentOuterBg);
        this.$dropdownLabelTextOuterBg.text(this.classNameToBg(this.currentOuterBg));
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
    removeStylePreferredBgs(style) {
        if (!this.updateGlobalOuterBgTriggered) {
            if (!this.hasCustomBg)
                this.$body.removeClass(style.preferredOuterBg);
        }
        if (!this.updateGlobalInnerBgTriggered) {
            $(this.innerBgSelector).each((index, element) => {
                element.classList.remove(style.preferredInnerBg);
            });
        }
    }
    addStylePreferredBgs(style) {
        if (!this.updateGlobalOuterBgTriggered) {
            if (!this.hasCustomBg)
                this.$body.addClass(style.preferredOuterBg);
            this.currentOuterBg = style.preferredOuterBg;
        }
        if (!this.updateGlobalInnerBgTriggered) {
            $(this.innerBgSelector).each((index, element) => {
                element.classList.add(style.preferredInnerBg);
            });
            this.currentInnerBg = style.preferredInnerBg;
        }
    }
    setupEvents() {
        this.setupOuterBgEvent();
        this.setupInnerBgEvent();
    }
    setupOuterBgEvent() {
        $('#dropdown-outer-bg .dropdown-item').on('click', (event) => {
            var _a;
            //first time  select outer bg 
            if (!this.updateGlobalOuterBgTriggered) {
                // TODO: ad-hoc solution in case use PagePiling and load section dynamically after page load, 
                // therefore all elements with innerBgSelector are not set currentInnerBg yet
                $(this.innerBgSelector).each((index, element) => {
                    element.classList.add(this.currentInnerBg);
                });
                // remove custom & preferred  bg also
                this.$body.removeClass(this.customBgClassName);
                this.$body.removeClass((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredOuterBg);
            }
            this.updateGlobalOuterBgTriggered = true;
            const lastOuterBg = this.currentOuterBg;
            this.currentOuterBg = this.bgToClassName(event.currentTarget.textContent);
            this.$body.removeClass(lastOuterBg);
            this.$body.addClass(this.currentOuterBg);
            this.$dropdownLabelTextOuterBg.text(event.currentTarget.textContent);
            this.$dropdownLabelOuterBg.addClass(this.currentOuterBg);
            this.$dropdownLabelOuterBg.removeClass(lastOuterBg);
        });
    }
    setupInnerBgEvent() {
        $('#dropdown-inner-bg .dropdown-item').on('click', (event) => {
            // first time  select inner  bg 
            if (!this.updateGlobalInnerBgTriggered) {
                $(this.innerBgSelector).each((index, element) => {
                    var _a;
                    element.classList.remove((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg);
                    // hide default bgColor to see new bg
                    element.style.backgroundColor = 'transparent';
                });
            }
            this.updateGlobalInnerBgTriggered = true;
            const lastInnerBg = this.currentInnerBg;
            this.currentInnerBg = this.bgToClassName(event.currentTarget.textContent);
            $(this.innerBgSelector).each((index, element) => {
                element.classList.remove(lastInnerBg);
                element.classList.add(this.currentInnerBg);
            });
            this.$dropdownLabelTextInnerBg.text(event.currentTarget.textContent);
            this.$dropdownLabelInnerBg.addClass(this.currentInnerBg);
            this.$dropdownLabelInnerBg.removeClass(lastInnerBg);
        });
    }
}
