export const bgHighlightSelectors = formatString([
        ".bg-highlight-color",
        ".border-style",
        "#pp-nav li .active span",
]);

export const bgSchemeSelectors = formatString([
        "body:not(.glass-style)",
        // ".hero-03",
        ".segmented-control",
        ".image-border",
        ".form-group",
        ".skill-box .skillbar",
        ".blog .blog-image",
        ".blog .blog-item .before",
        "#overlayer",
        ".toggle .indicator",
        ".radio-wrapper .indicator::after"
]);

export const bgBaseSelectors = formatString([
        "#pp-nav li :not(.active) span"
]);

export const colorHighlightSelectors = formatString([
        ".highlight-color",
        ".overlay-menu a.active",
        ".timeline-year",
        ".portfolio .radio-button-group li a",
        ".contact .form-item .form-control",
        ".highlight-portfolio-item.fa-star",
        //hover
        ".portfolio-icon a:hover",
        ".social a i:hover",
        ".list-inline.socials li a i:hover",
        ".overlay-menu-toggler:hover",
        " #myMenu li a:hover",
        // COMMON
        ".radio-wrapper .label:hover .text"
]);

export const colorBaseSelectors = formatString([
        "body",
        ".logo",
        ".setting-section .setting-button-border i",
        ".setting-panel-content p",
        ".range-slider label",
        "#color-panel label ",
        ".follow-label",
        ".social a i",
        ".blog-content h6 a",
        ".form-group input",
        ".form-group textarea",
        ".overlay-menu-toggler",
        ".modal-title",
        ".portfolio-single .close",
        ".pp-tooltip",
        ".blog-label a",
        // "#pp-nav li .pp-tooltip"
]);

export const colorMutedBaseSelectors = formatString([
        ".blog-content .list-inline-item span",
        ".contact-info-text small",
        ".hero-content p",
        ".title-wrapper span",
        ".form-control",
        ".range-slider__value",
        "::placeholder",
        // ".form-control::placeholder",         /* Chrome, Firefox, Opera, Safari 10.1+ */
        // ".form-control:-ms-input-placeholder",         /* Internet Explorer 10-11 */
        // ".form-control::-ms-input-placeholder"         /* Microsoft Edge */
        //COMMON
        ".radio-wrapper .label",
]);

export const borderRadiusSelectors = formatString([
        // BLOG
        ".blog .blog-image",
        ".blog .blog-image .after",
        ".blog .blog-intro ",
        ".blog .blog-intro img",
        ".post-sidebar",
        ".post-sidebar-toggle ",
        ".aside-contents",
        ".search .form-group",
        ".breadcrumb",
        ".blog-single img",
        ".comments img", //50%
        ".comments .commnet-image-border img", // 50%
        ".comments-devider",

        // CONTACT
        ".contact .form-item .form-group",
        ".contact #message.toast",
        ".form-group input",
        ".form-group textarea",

        //ELEMENTS
        ".button",
        ".nes-btn::after",
        ".button-border",
        ".image-border",
        ".box-border",
        ".badge-border",
        ".video-container",
        ".duties .image-border .box-hover-border",
        ".image-border img:not(.personal-image img)",
        ".range-slider__range",
        ".range-slider__value",
        "::-webkit-scrollbar-track",
        "::-webkit-scrollbar-thumb",
        " .setting-button",
        ".badge",
        "table",
        ".segmented-control",
        ".radio-selection",
        ".checkbox label",
        ".toggle",
        ".toggle .indicator",
        ".radio-wrapper .text",

        // SETTING
        ".setting-section .setting-panel",
        ".setting-section .setting-button-border",
        ".setting-button",
        ".setting-button a",
        ".color-scheme li a",

        // SELF-EDUCATION
        ".course-item img",
        ".book-item>img",
        ".skill-box .skillbar",
        ".skill-box .fill-skillbar",

        // PORTFOLIO
        ".portfolio-item-content",
        ".portfolio-icon a",
        ".portfolio-single img",
        ".injected-section",

        ".modal-content",
        ".portfolio-item-content::before",
        ".display-content",
        ".display-content>.container",
        ".testimonial .owl-carousel .owl-dot span",
        ".skill-item",
]);

//HELPER
function formatString(selectorsArray: string[]): string {
        return selectorsArray.join(", ");
}