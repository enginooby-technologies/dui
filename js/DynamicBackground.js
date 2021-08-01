import { DynamicUI } from "./DynamicUI.js";
export class DynamicBackground {
    constructor() {
        var _a;
        // TODO: find a way to cache $(innerBgSelector)
        this.innerBgSelector = ".display-content>.container"; // inner background, default is the scheme color
        this.customBgClassName = "custom-background";
        // although we select global bg for all UI styles, at the first time before doing that, 
        // each style can have its separate  preferred bg (e.g. glass-style w/ bg-3, neu-style w/o bg),
        // only when we manually update  bg from setting panel, all styles are triggerd to use global bg instead of its preferred one.
        this.updateGlobalBgTriggered = false;
        this.$body = $('body');
        this.hasCustomBg = this.$body.hasClass(this.customBgClassName);
        if (this.hasCustomBg)
            $(`.setting-panel .${this.customBgClassName}`).removeClass('hide');
        if (!this.hasCustomBg) {
            this.$body.addClass((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredOuterBg);
        }
        // TOFIX: not cover all elements if loading them dynamically after page load
        $(this.innerBgSelector).each((index, element) => {
            var _a;
            element.classList.add((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg);
        });
        // TODO: Toggle setting panel/button & scrollbar box-shadow according to current background so that does not look weird
        this.setupEvents();
    }
    removeStylePreferredBgs(style) {
        if (!this.updateGlobalBgTriggered) {
            if (!this.hasCustomBg)
                this.$body.removeClass(style.preferredOuterBg);
            $(this.innerBgSelector).each((index, element) => {
                element.classList.remove(style.preferredInnerBg);
            });
        }
    }
    addStylePreferredBgs(style) {
        if (!this.updateGlobalBgTriggered) {
            if (!this.hasCustomBg)
                this.$body.addClass(style.preferredOuterBg);
            $(this.innerBgSelector).each((index, element) => {
                element.classList.add(style.preferredInnerBg);
            });
            this.currentOuterBg = style.preferredOuterBg;
            this.currentInnerBg = style.preferredInnerBg;
        }
    }
    setupEvents() {
        $('#outer-background-panel .background-item').on('click', (event) => {
            var _a, _b;
            // TODO: ad-hoc solution in case use PagePiling and load section dynamically after page load, 
            // therefore all elements with innerBgSelector are not set currentInnerBg yet
            if (!this.updateGlobalBgTriggered) {
                $(this.innerBgSelector).each((index, element) => {
                    element.classList.add(this.currentInnerBg);
                });
            }
            this.updateGlobalBgTriggered = true;
            const lastOuterBg = this.currentOuterBg;
            this.currentOuterBg = (_b = (_a = event.currentTarget.getAttribute('class').match(/\S*-bg\b/i)) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 'none-bg';
            this.$body.removeClass(lastOuterBg);
            this.$body.addClass(this.currentOuterBg);
        });
        $('#inner-background-panel .background-item').on('click', (event) => {
            var _a, _b;
            this.updateGlobalBgTriggered = true;
            const lastInnerBg = this.currentInnerBg;
            this.currentInnerBg = (_b = (_a = event.currentTarget.getAttribute('class').match(/\S*-bg\b/i)) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 'none-bg';
            $(this.innerBgSelector).each((index, element) => {
                element.classList.remove(lastInnerBg);
                element.classList.add(this.currentInnerBg);
            });
        });
    }
}
