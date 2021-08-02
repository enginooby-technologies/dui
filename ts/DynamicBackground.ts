import { Style } from "./base/Style";
import { DynamicUI } from "./DynamicUI.js";

export class DynamicBackground {
        //TODO: can not update inner backgroun transparency for Glass style

        $body?: JQuery<HTMLElement>; //outer background
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
                this.hasCustomBg = this.$body.hasClass(this.customBgClassName);
                if (this.hasCustomBg) {
                        this.currentOuterBg = this.customBgClassName;
                        $(`.setting-panel .${this.customBgClassName}`).removeClass('hide');
                }
                if (!this.hasCustomBg) {
                        this.$body.addClass(DynamicUI.currentStyle?.preferredOuterBg!);
                }
                // TOFIX: not cover all elements if loading them dynamically after page load
                $(this.innerBgSelector).each((index, element) => {
                        element.classList.add(DynamicUI.currentStyle?.preferredInnerBg!);
                })

                // TODO: Toggle setting panel/button & scrollbar box-shadow according to current background so that does not look weird

                this.setupEvents();
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
                                element.classList.add(style.preferredInnerBg!);
                        })
                        this.currentInnerBg = style.preferredInnerBg;
                }
        }

        private setupEvents() {
                this.setupOuterBgEvent();
                this.setupInnerBgEvent();
        }

        private setupOuterBgEvent() {
                $('#outer-background-panel .background-item').on('click', (event) => {
                        //first time  select outer bg 
                        if (!this.updateGlobalOuterBgTriggered) {
                                // TODO: ad-hoc solution in case use PagePiling and load section dynamically after page load, 
                                // therefore all elements with innerBgSelector are not set currentInnerBg yet
                                $(this.innerBgSelector).each((index, element) => {
                                        element.classList.add(this.currentInnerBg!);
                                });
                                // remove custom bg also
                                this.$body!.removeClass(this.customBgClassName);
                        }

                        this.updateGlobalOuterBgTriggered = true;
                        const lastOuterBg: string = this.currentOuterBg!;
                        this.currentOuterBg = event.currentTarget.getAttribute('class')!.match(/\S*-bg\b/i)?.toString() ?? 'none-bg';
                        this.$body!.removeClass(lastOuterBg);
                        this.$body!.addClass(this.currentOuterBg);
                });
        }

        private setupInnerBgEvent() {
                $('#inner-background-panel .background-item').on('click', (event) => {
                        this.updateGlobalInnerBgTriggered = true;
                        const lastInnerBg: string = this.currentInnerBg!;
                        this.currentInnerBg = event.currentTarget.getAttribute('class')!.match(/\S*-bg\b/i)?.toString() ?? 'none-bg';
                        // console.log(this.currentInnerBg);

                        $(this.innerBgSelector).each((index, element) => {
                                element.classList.remove(lastInnerBg);
                                element.classList.add(this.currentInnerBg!);
                        });
                });
        }
}