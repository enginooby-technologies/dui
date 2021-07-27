export class Style {
    constructor(name) {
        this.insertEmptyRule = (selectors) => this.cssRules[this.styleSheet.insertRule(`${this.formatSelectorsArray(selectors)} {}`)];
        this.styleSheet = this.createStyleSheet();
        this.cssRules = this.styleSheet.cssRules || this.styleSheet.rules;
        this.name = name;
    }
    createStyleSheet() {
        var style = document.createElement("style");
        document.head.appendChild(style);
        return style.sheet;
    }
    formatSelectorsArray(array) {
        return array.map(selector => `.${this.name} ${selector}`).join(", ");
        // return array.join(", ");
    }
    onEnable() {
        this.init();
        this.setupCustomizeEvents();
    }
    ;
}
