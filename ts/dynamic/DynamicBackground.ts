import { DynamicUI } from "./DynamicUI.js";

const BG_CLASS_SUFFIX: string = '-bg';
const CUSTOM_BG_CLASS: string = 'custom-bg';
const INNER_BG_SELECTOR: string = ".display-content>.container";

export class DynamicBackground {
        eDropdownLabelOuterBg?: Element;
        eDropdownLabelTextOuterBg?: Element;
        eDropdownLabelInnerBg?: Element;
        eDropdownLabelTextInnerBg?: Element;
        esInnerBgContainers?: NodeListOf<Element>;

        currentOuterBg?: string;
        currentInnerBg?: string;
        lastOuterBg?: string;
        lastInnerBg?: string;

        /* if the main project using this framework has its own bg, use "custom-bg" class in <body>
                 for now replace only outer background */
        hasCustomBg?: boolean;
        /* although we select global bg for all UI styles, at the first time before doing that, 
        each style can have its separate  preferred bg (e.g. glass-style w/ bg-3, neu-style w/o bg),
         only when we manually update  bg from setting panel, all styles are triggerd to use global bg instead of its preferred one. */
        updateGlobalOuterBgTriggered: boolean = false;
        updateGlobalInnerBgTriggered: boolean = false;

        constructor() {
                this.getDomElements();
                this.initOuterBg();
                this.initInnerBg();
                this.initDropdowns();
                this.setupEvents();
                // TODO: Toggle setting panel/button & scrollbar box-shadow according to current background so that does not look weird
        }

        private getDomElements() {
                this.eDropdownLabelOuterBg = document.querySelector("#dropdown-outer-bg .dropdown-label")!;
                this.eDropdownLabelTextOuterBg = document.querySelector("#dropdown-outer-bg .dropdown-label p")!;
                this.eDropdownLabelInnerBg = document.querySelector("#dropdown-inner-bg .dropdown-label")!;
                this.eDropdownLabelTextInnerBg = document.querySelector("#dropdown-inner-bg .dropdown-label p")!;
                this.esInnerBgContainers = document.querySelectorAll(INNER_BG_SELECTOR);
        }

        private initOuterBg() {
                this.hasCustomBg = DynamicUI.$body!.hasClass(CUSTOM_BG_CLASS);
                if (this.hasCustomBg) {
                        this.currentOuterBg = CUSTOM_BG_CLASS;
                        document.querySelector(`.setting-panel .${CUSTOM_BG_CLASS}`)?.classList.remove('hide');
                } else {
                        this.currentOuterBg = DynamicUI.currentStyle?.preferredOuterBg!;
                        DynamicUI.$body!.addClass(this.currentOuterBg!);
                }
        }

        private initInnerBg() {
                this.esInnerBgContainers?.forEach((element) => {
                        element.classList.add(DynamicUI.currentStyle?.preferredInnerBg!);
                });
                this.currentInnerBg = DynamicUI.currentStyle?.preferredInnerBg!;
        }

        private initDropdowns() {
                // add bg class name to according item
                document.querySelectorAll("#dropdown-outer-bg .dropdown-item, #dropdown-inner-bg .dropdown-item").forEach((element) => {
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
                if (this.lastOuterBg) this.eDropdownLabelOuterBg?.classList.remove(this.lastOuterBg);
                this.eDropdownLabelOuterBg!.classList.add(this.currentOuterBg!);
                this.eDropdownLabelTextOuterBg!.textContent = this.classNameToBg(this.currentOuterBg!);
        }

        private updateInnerBgDropdownLabel() {
                if (this.lastInnerBg) this.eDropdownLabelInnerBg?.classList.remove(this.lastInnerBg);
                this.eDropdownLabelInnerBg!.classList.add(this.currentInnerBg!);
                this.eDropdownLabelTextInnerBg!.textContent = this.classNameToBg(this.currentInnerBg!);
        }

        // HELPER
        private bgToClassName(bgName: string) {
                return bgName.replace(' ', '-').toLowerCase() + BG_CLASS_SUFFIX;
        }

        // HELPER
        private classNameToBg(className: string) {
                return this.capitalizeFirstLetter(className).replace(BG_CLASS_SUFFIX, '').replace('-', ' ');
        }

        // HELPER
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

        private applyCurrentStyleInnerBg() {
                if (this.currentInnerBg == DynamicUI.currentStyle?.preferredInnerBg) return;
                this.lastInnerBg = this.currentInnerBg;
                this.currentInnerBg = DynamicUI.currentStyle?.preferredInnerBg;
                this.onChangeInnerBg();
        }

        private setupEvents() {
                document.querySelectorAll('#dropdown-outer-bg .dropdown-item')?.forEach(element => {
                        element.addEventListener('click', this.onSelectOuterBg);
                })
                document.querySelectorAll('#dropdown-inner-bg .dropdown-item')?.forEach(element => {
                        element.addEventListener('click', this.onSelectInnerBg);
                })
        }

        // CAUTION: use arrow function for event handler in order to use "this"
        private onSelectOuterBg = (event: Event) => {
                if (!this.updateGlobalOuterBgTriggered) this.onFirstTimeSelectOuterBg();
                this.lastOuterBg = this.currentOuterBg!;
                this.currentOuterBg = this.bgToClassName((event.target as Element).textContent!);
                if (this.lastOuterBg != this.currentOuterBg) this.onChangeOuterBg();
        }

        private onFirstTimeSelectOuterBg() {
                this.updateGlobalOuterBgTriggered = true;
                // TODO: ad-hoc solution in case use PagePiling and load section dynamically after page load, 
                // therefore all elements with innerBgSelector are not set currentInnerBg yet
                this.esInnerBgContainers?.forEach((element) => {
                        element.classList.add(this.currentInnerBg!);
                });
                // remove custom & preferred  bg also 
                DynamicUI.$body!.removeClass(CUSTOM_BG_CLASS);
                DynamicUI.$body!.removeClass(DynamicUI.currentStyle?.preferredOuterBg!);
        }

        private onChangeOuterBg() {
                DynamicUI.$body!.removeClass(this.lastOuterBg);
                DynamicUI.$body!.addClass(this.currentOuterBg!);
                this.updateOuterBgDropdownLabel();
        }

        private onSelectInnerBg = (event: Event) => {
                if (!this.updateGlobalInnerBgTriggered) this.onFirstTimeSelectInnerBg();
                this.lastInnerBg = this.currentInnerBg!;
                this.currentInnerBg = this.bgToClassName((event.target as Element).textContent!);
                if (this.lastInnerBg != this.currentInnerBg) this.onChangeInnerBg();
        }

        private onFirstTimeSelectInnerBg() {
                this.updateGlobalInnerBgTriggered = true;
                this.esInnerBgContainers!.forEach((element) => {
                        element.classList.remove(DynamicUI.currentStyle?.preferredInnerBg!);
                        // hide default bgColor to see new bg
                        (element as HTMLElement).style.backgroundColor = 'transparent';
                });
        }

        private onChangeInnerBg() {
                this.esInnerBgContainers!.forEach((element) => {
                        element.classList.remove(this.lastInnerBg!);
                        element.classList.add(this.currentInnerBg!);
                });
                this.updateInnerBgDropdownLabel();
        }
}