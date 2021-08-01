import { fallbackSettingFilePath, settingFilePath } from './Config.js';
import * as DynamicSelectors from './selectors/DynamicSelectors.js';
import { StyleRegistry } from './StyleRegistry.js';
import { DynamicColor } from './DynamicColor.js';
export class DynamicUI {
    constructor() {
        // TODO: find a way to cache $(innerBgSelector)
        this.innerBgSelector = ".display-content>.container"; // inner background, default is the scheme color
        this.customBgClassName = "custom-background";
        // although we select global bg for all UI styles, at the first time before doing that, 
        // each style can have its separate  preferred bg (e.g. glass-style w/ bg-3, neu-style w/o bg),
        // only when we manually update  bg from setting panel, all styles are triggerd to use global bg instead of its preferred one.
        this.updateGlobalBgTriggered = false;
        this.borderRadius = 9;
        this.loadSettingPanel(settingFilePath)
            .fail(() => this.loadSettingPanel(fallbackSettingFilePath));
    }
    static createStyleSheet() {
        var style = document.createElement("style");
        document.head.appendChild(style);
        return style.sheet;
    }
    static insertEmptyRule(selector) {
        return DynamicUI.cssRules[DynamicUI.styleSheet.insertRule(`${selector} {}`)];
    }
    getBorderRadiusRule() {
        var _a;
        return (_a = this.borderRadiusRule) !== null && _a !== void 0 ? _a : (this.borderRadiusRule = DynamicUI.insertEmptyRule(DynamicSelectors.borderRadiusSelectors));
    }
    changeStyle(newStyle) {
        var _a, _b, _c, _d, _e, _f, _g;
        (_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.onDisable();
        this.$body.removeClass((_b = DynamicUI.currentStyle) === null || _b === void 0 ? void 0 : _b.name);
        if (!this.updateGlobalBgTriggered) {
            if (!this.hasCustomBg)
                this.$body.removeClass((_c = DynamicUI.currentStyle) === null || _c === void 0 ? void 0 : _c.preferredOuterBg);
            $(this.innerBgSelector).each((index, element) => {
                var _a;
                element.classList.remove((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg);
            });
        }
        DynamicUI.currentStyle = newStyle;
        this.$body.addClass(DynamicUI.currentStyle.name);
        if (!this.updateGlobalBgTriggered) {
            if (!this.hasCustomBg)
                this.$body.addClass((_d = DynamicUI.currentStyle) === null || _d === void 0 ? void 0 : _d.preferredOuterBg);
            $(this.innerBgSelector).each((index, element) => {
                var _a;
                element.classList.add((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredInnerBg);
            });
            this.currentOuterBg = (_e = DynamicUI.currentStyle) === null || _e === void 0 ? void 0 : _e.preferredOuterBg;
            this.currentInnerBg = (_f = DynamicUI.currentStyle) === null || _f === void 0 ? void 0 : _f.preferredInnerBg;
        }
        $(".customizer").hide();
        DynamicUI.currentStyle.onEnable();
        (_g = this.dynamicColor) === null || _g === void 0 ? void 0 : _g.updateChangesFromLastStyle();
    }
    loadSettingPanel(filePath) {
        return $.get(filePath, function (data) {
            $('body').append(data);
        }).done(() => {
            this.init();
        });
    }
    init() {
        var _a, _b;
        DynamicUI.styleSheet = DynamicUI.createStyleSheet();
        DynamicUI.cssRules = DynamicUI.styleSheet.cssRules || DynamicUI.styleSheet.rules;
        this.initSettingPanel();
        this.setupSettingEvents();
        this.$body = $('body');
        this.dynamicColor = new DynamicColor();
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
        const initStyleName = (_b = this.$body.attr('class').match(/\S*-style\b/i)) === null || _b === void 0 ? void 0 : _b.toString();
        new StyleRegistry(this, initStyleName);
        $(".status_change .dropdown-item").click(function () {
            var getStatusText = $(this).text();
            $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
            var generateStatusClass = `${$(this).attr('data-class')}-status`;
            $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
        });
    }
    initSettingPanel() {
        $('#border-radius').attr('value', this.borderRadius);
        $("#border-radius").next('.range-slider__value').html(this.borderRadius.toString());
    }
    setupSettingEvents() {
        $("#setting-section .setting-button-border").on('click', function () {
            $("#setting-section .setting-panel").toggleClass('show');
            $(this).toggleClass('active');
            $('#setting-section .setting-button').toggleClass('active');
        });
        $('.theme-skin.radio-button-group .button').on('click', event => {
            $('.theme-skin.radio-button-group .button').removeClass('active');
            $(event.currentTarget).addClass('active');
        });
        this.setupRangeSliderEvents();
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
            this.updateGlobalBgTriggered = true;
            const lastInnerBg = this.currentInnerBg;
            this.currentInnerBg = event.currentTarget.id;
            $(this.innerBgSelector).each((index, element) => {
                element.classList.remove(lastInnerBg);
                element.classList.add(this.currentInnerBg);
            });
        });
    }
    setupRangeSliderEvents() {
        $("#border-radius").on('input', (event) => {
            const newValue = event.target.value;
            $("#" + event.target.id).next('.range-slider__value').text(newValue);
            switch (event.target.id) {
                case 'border-radius':
                    this.borderRadius = parseInt(newValue);
                    break;
            }
            this.updateBorder();
        });
    }
    updateBorder() {
        this.getBorderRadiusRule().style.setProperty('border-radius', `${this.borderRadius}px`);
        $('.background-item').css('border-radius', this.borderRadius * 6); // since its zoom is 1/6
    }
}
// CONSIDER: where to put this
new DynamicUI();
