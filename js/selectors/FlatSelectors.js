export const bgSchemeSelectors = [
    ".display-content>.container",
    ".range-slider__range",
    ".range-slider__value",
    ".modal-content",
    ".radio-button-group .button:not(.active)",
];
export const bgLightenSchemeSelectors = [
    // CONTAINER COMPONENT
    ".code-block",
    ".box-border",
    ".image-border",
    ".contact .form-item .form-group",
    ".segmented-control",
    ".checkbox label",
    ".setting-button-border",
    ".setting-panel",
    ".setting-button",
    ".setting-button a",
    "::-webkit-scrollbar-track"
];
export const bgDarkenHighlightSelectors = [
    "::-webkit-scrollbar-thumb:hover",
    "::-webkit-slider-thumb:hover",
    ".button:not(.radio-button-group .button):hover",
];
export const colorBaseSelectors = [
    ".radio-button-group .button ",
];
export const colorMutedBaseSelectors = [
    ".segmented-control>input:not(:checked):not(:hover)+label",
    ".checkbox input:not(:checked)~label+.name",
    ".checkbox input:not(:checked):not(:hover)~label i",
];
