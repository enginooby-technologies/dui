/* common DOM/CSS related */
export const root = document.documentElement;
export const styleSheet = createStyleSheet();
export const cssRules = styleSheet.cssRules || styleSheet.rules;
function createStyleSheet() {
  var style = document.createElement("style");
  document.head.appendChild(style);
  return style.sheet;
}
export function insertEmptyRule(selector) {
  return cssRules[styleSheet.insertRule(`${selector} {}`)];
}
