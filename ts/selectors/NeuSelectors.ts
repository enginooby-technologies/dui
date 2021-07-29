
export const backgroundSchemeColorSelectors = [
        ".display-content>.container",
        ".injected-section .display-content",
        "::-webkit-scrollbar-track",
        "::-webkit-scrollbar-thumb",
        ".setting-button a"
];

export const colorHighlightColorSelectors = [
        ".button",
        " .checkbox input:checked~label+.name",
        ".checkbox input:checked~label i",
        ".checkbox input:hover~label i",
        ".segmented-control>input:checked+label",
        ".segmented-control>input:hover+label",
];

export const colorMutedBaseColorSelectors = [
        ".checkbox input:not(:checked)~label+.name",
        ".checkbox input:not(:checked):not(:hover)~label i",
        ".segmented-control>input:not(:checked):not(:hover)+label"
];

export const dropBoxShadowSelectors = [
        //COMMON
        ".toggle .indicator",
        ".button-border",
        ".box-border",
        ".image-border",
        ".badge-border",
        ".setting-button-border",
        ".segmented-control",
        ".hero-03 .personal-image img",
        ".checkbox label",
        ".blog-intro",
        "table",
        "table thead ",
        ".range-slider__value",
        ".setting-panel",
        "::-webkit-slider-thumb",
        ".dui-radio .indicator",
        //contact
        ".form-group input:focus",
        ".form-group textarea:focus",
];

export const insetBoxShadowSelectors = [

        ".custom-scrollbar",
        ".blog .blog-image .after",
        ".skill-boxes .box-border",
        ".setting-section .scrollable",
        ".timeline-items.box-border",
        ".range-slider__range",
        "::-webkit-scrollbar-track",
        ".checkbox input:checked~label",
        ".button.active",
        ".setting-button.active",
        ".button:hover",
        ".badge-border:hover",
        "table>tbody>tr:hover",
        ".setting-button:hover",
        ".radio-selection",
        /*-------------------------
CONTAINER COMPONENTS
-------------------------*/
        ".code-block",
];

export const concaveBoxShadowSelectors = [
        ".skill-box .skillbar",
        // ".form-group",
        "input[type=range]:focus",
        "::-webkit-slider-thumb:hover",
        //CONTACT
        ".form-group input",
        ".form-group textarea",
        ".toggle",
];

export const borderSelectors = [
        /*-------------------------
CONTAINER COMPONENTS
-------------------------*/
        ".code-block",

        //COMMON
        ".ELEMENTS",
        ".button",
        ".box-border",
        ".setting-section .setting-panel",
        " .setting-button",
        ".image-border",
        "table",
        ".toggle",
        ".toggle .indicator",
        ".range-slider__range",
        ".range-slider__value",
        "::-webkit-slider-thumb",
        // "::-webkit-scrollbar-track",
        // "::-webkit-scrollbar-thumb",

        // PORTFOLIO
        ".segmented-control", //TODO: set max limit
        ".radio-selection", //TODO: set max limit
        ".checkbox label", //TODO: set max limit

        // BLOG
        ".blog .blog-image .after",
        ".blog .blog-intro ",

        //CONTACT
        // ".contact .form-item .form-group",
        // ".contact #message.toast",
        ".form-group input",
        ".form-group textarea",
]

export const surfaceSelectors = [
        /*-------------------------
CONTAINER COMPONENTS
-------------------------*/
        ".code-block",

        ".button",
        ".setting-button",
        ".box-border",
        ".setting-panel",
        ".image-border",
        ".badge-border",
        ".segmented-control",
        ".checkbox label",
        ".blog-intro",
        "  .form-item .form-group",
        ".range-slider__range",
        ".range-slider__value",
        "::-webkit-slider-thumb",
        ".portfolio-single .modal-content",
        "table thead ",
]