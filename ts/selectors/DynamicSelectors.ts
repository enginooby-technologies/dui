export const fontSelectors = formatString([
        // "*:not(i):not(.fas):not(.fa)",
        "body",
        "p",
        // "code",
        "li>span, .title-wrapper>span, span.badge",
        "a",
        "button",
        ".pp-tooltip",
        "h1, h2, h3, h4, h5, h6",
]);

// 1: selectors for scaling can not be overlapping, for e.g. if <span> text inside <p>, it will be scaled twice!
//2: use relative units like rem
//3: wrap scalable text of components inside a seperate tag such as div, span, p
//4: don't use max-width on <p>
export const fontScaleSelectors = formatString([
        "h1,h2,h3,h4,h5,h6",
        "p, .title-wrapper, small",
        "label:not(.checkbox label):not(.toggle-label):not(.dui-radio label)",
        "  .button",
        // ".button i",
        // "button",
        "a.dropdown-item",
        ".dui-radio .text",
        " table th, table tbody, .badge-pill, .checkbox .name, .blog-link>a",
        ".form-group input, .form-group textarea",
        ".alert",
        ".range-slider__value",
        ".toggle-label>.label-text",
        // project-domain
        ".follow-label .scalable, .logo, #pp-nav li .pp-tooltip",
        "#overlay-menu li"
])

//HELPER
function formatString(selectorsArray: string[]): string {
        return selectorsArray.join(", ");
}