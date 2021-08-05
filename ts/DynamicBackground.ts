import { DynamicUI } from "./DynamicUI.js";

const BG_CLASS_SUFFIX: string = '-bg';
const CUSTOM_BG_CLASS: string = 'custom-bg';
// TODO: find a way to cache $(innerBgSelector)
const INNER_BG_SELECTOR: string = ".display-content>.container"; // inner background, default is the scheme color


export class DynamicBackground {
        $dropdownLabelOuterBg?: JQuery<HTMLElement>;
        $dropdownLabelTextOuterBg?: JQuery<HTMLElement>;
        $dropdownLabelInnerBg?: JQuery<HTMLElement>;
        $dropdownLabelTextInnerBg?: JQuery<HTMLElement>;

        currentOuterBg?: string;
        currentInnerBg?: string;
        lastOuterBg?: string;
        lastInnerBg?: string;

        // if the main project using this framework has its own bg, use "custom-background" class in <body>
        hasCustomBg?: boolean;  // for now replace only outer background
        // although we select global bg for all UI styles, at the first time before doing that, 
        // each style can have its separate  preferred bg (e.g. glass-style w/ bg-3, neu-style w/o bg),
        // only when we manually update  bg from setting panel, all styles are triggerd to use global bg instead of its preferred one.
        updateGlobalOuterBgTriggered: boolean = false;
        updateGlobalInnerBgTriggered: boolean = false;

        constructor() {
                this.getDomElements();
                this.hasCustomBg = DynamicUI.$body!.hasClass(CUSTOM_BG_CLASS);
                if (this.hasCustomBg) {
                        this.currentOuterBg = CUSTOM_BG_CLASS;
                        $(`.setting-panel .${CUSTOM_BG_CLASS}`).removeClass('hide');
                } else {
                        this.currentOuterBg = DynamicUI.currentStyle?.preferredOuterBg!
                        DynamicUI.$body!.addClass(this.currentOuterBg!);
                }
                $(INNER_BG_SELECTOR).each((index, element) => {
                        element.classList.add(DynamicUI.currentStyle?.preferredInnerBg!);
                })
                this.currentInnerBg = DynamicUI.currentStyle?.preferredInnerBg!

                // TODO: Toggle setting panel/button & scrollbar box-shadow according to current background so that does not look weird

                this.initDropdowns();
                this.setupEvents();
        }

        private getDomElements() {
                this.$dropdownLabelOuterBg = $("#dropdown-outer-bg .dropdown-label");
                this.$dropdownLabelTextOuterBg = $("#dropdown-outer-bg .dropdown-label p");
                this.$dropdownLabelInnerBg = $("#dropdown-inner-bg .dropdown-label");
                this.$dropdownLabelTextInnerBg = $("#dropdown-inner-bg .dropdown-label p");
        }

        private initDropdowns() {
                // add bg class name to according item
                $("#dropdown-outer-bg .dropdown-item, #dropdown-inner-bg .dropdown-item").each((index, element) => {
                        const bgClassName = this.bgToClassName(element.textContent!)
                        element.classList.add(bgClassName);
                })
                this.updateDropdownLabels();
        }

        private updateDropdownLabels() {
                this.updateOuterBgDropdownLabel();
                this.updateInnerBgDropdownLabel();
        }

        private updateOuterBgDropdownLabel() {
                if (this.lastOuterBg) this.$dropdownLabelOuterBg?.removeClass(this.lastOuterBg);
                this.$dropdownLabelOuterBg!.addClass(this.currentOuterBg!);
                this.$dropdownLabelTextOuterBg!.text(this.classNameToBg(this.currentOuterBg!));
        }

        private updateInnerBgDropdownLabel() {
                if (this.lastInnerBg) this.$dropdownLabelInnerBg?.removeClass(this.lastInnerBg);
                this.$dropdownLabelInnerBg!.addClass(this.currentInnerBg!);
                this.$dropdownLabelTextInnerBg!.text(this.classNameToBg(this.currentInnerBg!));
        }

        private bgToClassName(bgName: string) {
                return bgName.replace(' ', '-').toLowerCase() + BG_CLASS_SUFFIX;
        }

        private classNameToBg(className: string) {
                return this.capitalizeFirstLetter(className).replace(BG_CLASS_SUFFIX, '').replace('-', ' ');
        }

        private capitalizeFirstLetter(word: string) {
                return word.charAt(0).toUpperCase() + word.slice(1);
        }

        public onStyleUpdate() {
                if (!this.updateGlobalOuterBgTriggered) this.applyCurrentStyleOuterBg();
                if (!this.updateGlobalInnerBgTriggered) this.applyCurrentStyleInnerBg();
        }

        private applyCurrentStyleOuterBg() {
                if (this.currentOuterBg == DynamicUI.currentStyle?.preferredOuterBg) return;
                //TODO: handle custom bg case -  if (!this.hasCustomBg) 
                this.lastOuterBg = this.currentOuterBg;
                this.currentOuterBg = DynamicUI.currentStyle?.preferredOuterBg;
                this.onChangeOuterBg();
        }

        private onChangeOuterBg() {
                DynamicUI.$body!.removeClass(this.lastOuterBg);
                DynamicUI.$body!.addClass(this.currentOuterBg!);
                this.updateOuterBgDropdownLabel();
        }

        private applyCurrentStyleInnerBg() {
                if (this.currentInnerBg == DynamicUI.currentStyle?.preferredInnerBg) return;
                this.lastInnerBg = this.currentInnerBg;
                this.currentInnerBg = DynamicUI.currentStyle?.preferredInnerBg;
                this.onChangeInnerBg();
        }

        private onChangeInnerBg() {
                $(INNER_BG_SELECTOR).each((index, element) => {
                        element.classList.remove(this.lastInnerBg!);
                        element.classList.add(this.currentInnerBg!);
                });
                this.updateInnerBgDropdownLabel();
        }

        private setupEvents() {
                this.setupSelectOuterBgEvent();
                this.setupSelectInnerBgEvent();
        }

        private setupSelectOuterBgEvent() {
                $('#dropdown-outer-bg .dropdown-item').on('click', event => {
                        if (!this.updateGlobalOuterBgTriggered) this.onFirstTimeSelectOuterBg();
                        this.lastOuterBg = this.currentOuterBg!;
                        this.currentOuterBg = this.bgToClassName(event.currentTarget.textContent!);
                        if (this.lastOuterBg != this.currentOuterBg) this.onChangeOuterBg();
                });
        }

        private onFirstTimeSelectOuterBg() {
                this.updateGlobalOuterBgTriggered = true;
                // TODO: ad-hoc solution in case use PagePiling and load section dynamically after page load, 
                // therefore all elements with innerBgSelector are not set currentInnerBg yet
                $(INNER_BG_SELECTOR).each((index, element) => {
                        element.classList.add(this.currentInnerBg!);
                });
                // remove custom & preferred  bg also 
                DynamicUI.$body!.removeClass(CUSTOM_BG_CLASS);
                DynamicUI.$body!.removeClass(DynamicUI.currentStyle?.preferredOuterBg!);
        }

        private setupSelectInnerBgEvent() {
                $('#dropdown-inner-bg .dropdown-item').on('click', event => {
                        if (!this.updateGlobalInnerBgTriggered) this.onFirstTimeSelectInnerBg();
                        this.lastInnerBg = this.currentInnerBg!;
                        this.currentInnerBg = this.bgToClassName(event.currentTarget.textContent!);
                        if (this.lastInnerBg != this.currentInnerBg) this.onChangeInnerBg();
                });
        }

        private onFirstTimeSelectInnerBg() {
                this.updateGlobalInnerBgTriggered = true;
                $(INNER_BG_SELECTOR).each((index, element) => {
                        element.classList.remove(DynamicUI.currentStyle?.preferredInnerBg!);
                        // hide default bgColor to see new bg
                        element.style.backgroundColor = 'transparent';
                });
        }
}