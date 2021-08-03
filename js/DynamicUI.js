import { fallbackSettingFilePath, settingFilePath } from './Config.js';
import * as DynamicSelectors from './selectors/DynamicSelectors.js';
import { StyleRegistry } from './StyleRegistry.js';
import { DynamicColor } from './DynamicColor.js';
import { DynamicBackground } from './DynamicBackground.js';
import { DynamicFont } from './DynamicFont.js';
export class DynamicUI {
    constructor() {
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
    setCurrentStyle(newStyle) {
        var _a, _b, _c, _d, _e, _f;
        (_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.onDisable();
        this.$body.removeClass((_b = DynamicUI.currentStyle) === null || _b === void 0 ? void 0 : _b.name);
        if (DynamicUI.currentStyle)
            (_c = this.dynamicBackground) === null || _c === void 0 ? void 0 : _c.removeStylePreferredBgs(DynamicUI.currentStyle);
        DynamicUI.currentStyle = newStyle;
        this.$body.addClass(DynamicUI.currentStyle.name);
        (_d = this.dynamicBackground) === null || _d === void 0 ? void 0 : _d.addStylePreferredBgs(DynamicUI.currentStyle);
        if (DynamicUI.currentStyle.preferredFontFamily) {
            (_e = this.dynamicFont) === null || _e === void 0 ? void 0 : _e.loadThenApplyFontFamily(DynamicUI.currentStyle.preferredFontFamily);
        }
        $(".customizer").hide();
        DynamicUI.currentStyle.onEnable();
        (_f = this.dynamicColor) === null || _f === void 0 ? void 0 : _f.updateChangesFromLastStyle();
    }
    loadSettingPanel(filePath) {
        return $.get(filePath, function (data) {
            $('body').append(data);
        }).done(() => {
            this.init();
        });
    }
    init() {
        var _a;
        DynamicUI.styleSheet = DynamicUI.createStyleSheet();
        DynamicUI.cssRules = DynamicUI.styleSheet.cssRules || DynamicUI.styleSheet.rules;
        this.initSettingPanel();
        this.setupSettingEvents();
        this.$body = $('body');
        this.dynamicColor = new DynamicColor();
        this.dynamicFont = new DynamicFont();
        this.dynamicBackground = new DynamicBackground();
        const initStyleName = (_a = this.$body.attr('class').match(/\S*-style\b/i)) === null || _a === void 0 ? void 0 : _a.toString();
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
