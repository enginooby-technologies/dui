/* common DOM/CSS related */
export const root = document.documentElement;
export const styleSheet: CSSStyleSheet = createStyleSheet();
export const cssRules: CSSRuleList = styleSheet.cssRules || styleSheet.rules;

function createStyleSheet(): CSSStyleSheet {
        var style = document.createElement("style");
        document.head.appendChild(style);
        return style.sheet!;
}

export function insertEmptyRule(selector: string): CSSStyleRule {
        return cssRules![styleSheet!.insertRule(`${selector} {}`)] as CSSStyleRule;
}