import { Style } from "./base/Style";
import { DynamicUI } from "./DynamicUI.js";

export class DynamicBackground {
        //TODO: can not update inner backgroun transparency for Glass style

        $body?: JQuery<HTMLElement>; //outer background
        $dropdownLabelOuterBg?: JQuery<HTMLElement>;
        $dropdownLabelTextOuterBg?: JQuery<HTMLElement>;
        $dropdownLabelInnerBg?: JQuery<HTMLElement>;
        $dropdownLabelTextInnerBg?: JQuery<HTMLElement>;
        // TODO: find a way to cache $(innerBgSelector)
        innerBgSelector: string = ".display-content>.container"; // inner background, default is the scheme color
        currentOuterBg?: string;
        currentInnerBg?: string;
        // if the main project using this framework has its own bg, use "custom-background" class in <body>
        hasCustomBg?: boolean;  // for now replace only outer background
        customBgClassName: string = "custom-bg"
        // although we select global bg for all UI styles, at the first time before doing that, 
        // each style can have its separate  preferred bg (e.g. glass-style w/ bg-3, neu-style w/o bg),
        // only when we manually update  bg from setting panel, all styles are triggerd to use global bg instead of its preferred one.
        updateGlobalOuterBgTriggered: boolean = false;
        updateGlobalInnerBgTriggered: boolean = false;

        constructor() {
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
                        this.currentOuterBg = DynamicUI.currentStyle?.preferredOuterBg!
                        this.$body.addClass(this.currentOuterBg!);
                }
                // TOFIX: not cover all elements if loading them dynamically after page load
                $(this.innerBgSelector).each((index, element) => {
                        element.classList.add(DynamicUI.currentStyle?.preferredInnerBg!);
                })
                this.currentInnerBg = DynamicUI.currentStyle?.preferredInnerBg!

                // TODO: Toggle setting panel/button & scrollbar box-shadow according to current background so that does not look weird

                this.initDropdowns();
                this.setupEvents();
        }

        private initDropdowns() {
                // add bg class name to according item
                $("#dropdown-outer-bg .dropdown-item, #dropdown-inner-bg .dropdown-item").each((index, element) => {
                        const bgClassName = this.bgToClassName(element.textContent!)
                        element.classList.add(bgClassName);
                })
                //update current bgs to dropdowns
                this.$dropdownLabelOuterBg!.addClass(this.currentOuterBg!);
                this.$dropdownLabelTextOuterBg!.text(this.classNameToBg(this.currentOuterBg!));
                this.$dropdownLabelInnerBg!.addClass(this.currentInnerBg!);
                this.$dropdownLabelTextInnerBg!.text(this.classNameToBg(this.currentInnerBg!));
        }

        private bgToClassName(bgName: string) {
                return bgName.replace(' ', '-').toLowerCase() + '-bg';
        }

        private classNameToBg(className: string) {
                return this.capitalizeFirstLetter(className).replace('-bg', '').replace('-', ' ');
        }

        private capitalizeFirstLetter(word: string) {
                return word.charAt(0).toUpperCase() + word.slice(1);
        }

        public removeStylePreferredBgs(style: Style) {
                if (!this.updateGlobalOuterBgTriggered) {
                        if (!this.hasCustomBg) this.$body!.removeClass(style.preferredOuterBg);
                }

                if (!this.updateGlobalInnerBgTriggered) {
                        $(this.innerBgSelector).each((index, element) => {
                                element.classList.remove(style.preferredInnerBg!);
                        })
                }
        }

        public addStylePreferredBgs(style: Style) {
                if (!this.updateGlobalOuterBgTriggered) {
                        if (!this.hasCustomBg) this.$body!.addClass(style.preferredOuterBg);
                        this.currentOuterBg = style.preferredOuterBg;
                }

                if (!this.updateGlobalInnerBgTriggered) {
                        $(this.innerBgSelector).each((index, element) => {
                                element.classList.add(style.preferredInnerBg);
                        })
                        this.currentInnerBg = style.preferredInnerBg;
                }
        }

        private setupEvents() {
                this.setupOuterBgEvent();
                this.setupInnerBgEvent();
        }

        private setupOuterBgEvent() {
                $('#dropdown-outer-bg .dropdown-item').on('click', (event) => {
                        //first time  select outer bg 
                        if (!this.updateGlobalOuterBgTriggered) {
                                // TODO: ad-hoc solution in case use PagePiling and load section dynamically after page load, 
                                // therefore all elements with innerBgSelector are not set currentInnerBg yet
                                $(this.innerBgSelector).each((index, element) => {
                                        element.classList.add(this.currentInnerBg!);
                                });
                                // remove custom & preferred  bg also
                                this.$body!.removeClass(this.customBgClassName);
                                this.$body!.removeClass(DynamicUI.currentStyle?.preferredOuterBg!);
                        }

                        this.updateGlobalOuterBgTriggered = true;
                        const lastOuterBg: string = this.currentOuterBg!;
                        this.currentOuterBg = this.bgToClassName(event.currentTarget.textContent!);
                        this.$body!.removeClass(lastOuterBg);
                        this.$body!.addClass(this.currentOuterBg);

                        this.$dropdownLabelTextOuterBg!.text(event.currentTarget.textContent!)
                        this.$dropdownLabelOuterBg!.addClass(this.currentOuterBg);
                        this.$dropdownLabelOuterBg!.removeClass(lastOuterBg);
                })
        }

        private setupInnerBgEvent() {
                $('#dropdown-inner-bg .dropdown-item').on('click', (event) => {
                        // first time  select inner  bg 
                        if (!this.updateGlobalInnerBgTriggered) {
                                $(this.innerBgSelector).each((index, element) => {
                                        element.classList.remove(DynamicUI.currentStyle?.preferredInnerBg!);
                                        // hide default bgColor to see new bg
                                        element.style.backgroundColor = 'transparent';
                                });
                        }

                        this.updateGlobalInnerBgTriggered = true;
                        const lastInnerBg: string = this.currentInnerBg!;
                        this.currentInnerBg = this.bgToClassName(event.currentTarget.textContent!);

                        $(this.innerBgSelector).each((index, element) => {
                                element.classList.remove(lastInnerBg);
                                element.classList.add(this.currentInnerBg!);
                        });

                        this.$dropdownLabelTextInnerBg!.text(event.currentTarget.textContent!)
                        this.$dropdownLabelInnerBg!.addClass(this.currentInnerBg);
                        this.$dropdownLabelInnerBg!.removeClass(lastInnerBg);
                });
        }
}