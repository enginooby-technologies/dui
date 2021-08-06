import { ScripFile, StyleSheetFile, jqueryMinJs } from "./references.js";

const scripts = document.getElementsByTagName("script");
const links = document.getElementsByTagName("link");

// HTML & PHP
// jquery-dependent
export function loadFile(filePath: string) {
        if (!checkScriptIncludedOrIgnored(jqueryMinJs)) {
                jqueryMinJs.onload = () => {
                        return $.get(filePath, function (data) {
                                $('body').append(data);
                        })
                }
                loadScript(jqueryMinJs);
        } else {
                return $.get(filePath, function (data) {
                        $('body').append(data);
                })
        }
}

// JS
function loadScript(script: ScripFile) {
        console.log(`>>> Loading ${script.name.toLocaleUpperCase()} from ${script.src}`);
        const scriptElement: HTMLScriptElement = document.createElement('script');
        if (script.onerror) scriptElement.onerror = script.onerror;
        if (script.onload) scriptElement.onload = script.onload;
        scriptElement.src = script.src;
        if (script.isModule) scriptElement.type = "module";
        if (script.integrity) {
                scriptElement.integrity = script.integrity;
                scriptElement.crossOrigin = "anonymous";
                scriptElement.referrerPolicy = "no-referrer";
        }
        document.head.appendChild(scriptElement);
}

// CSS
function loadStyleSheet(sheet: StyleSheetFile) {
        console.log(`>>> Loading ${sheet.name.toLocaleUpperCase()} from ${sheet.href}`);
        const link: HTMLLinkElement = document.createElement('link');
        link.href = sheet.href;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        if (sheet.integrity) {
                link.integrity = sheet.integrity;
                link.crossOrigin = "anonymous";
                link.referrerPolicy = "no-referrer";
        }
        // load the sheet on top of head to avoid overriding framework sheet
        document.head.insertBefore(link, document.getElementsByTagName("head")[0].firstChild);
}

// REFACTOR
export function tryLoadScript(script: ScripFile) {
        let isFileNeeded: boolean = true;
        if (script.triggerClasses) {
                isFileNeeded = false;
                for (let className of script.triggerClasses) {
                        if (document.querySelector("." + className)) isFileNeeded = true;
                        break;
                }
        }
        script.triggerClasses?.forEach(className => { if (document.querySelector("." + className)) isFileNeeded = true; })
        if (isFileNeeded && !checkScriptIncludedOrIgnored(script)) loadScript(script);
}

export function tryLoadStyleSheet(sheet: StyleSheetFile) {
        let isFileNeeded: boolean = true;
        if (sheet.triggerClasses) {
                isFileNeeded = false;
                for (let className of sheet.triggerClasses) {
                        if (document.querySelector("." + className)) isFileNeeded = true;
                        break;
                }
        }
        sheet.triggerClasses?.forEach(className => { if (document.querySelector("." + className)) isFileNeeded = true; })
        if (isFileNeeded && !checkStyleSheetIncludedOrIgnored(sheet)) loadStyleSheet(sheet);
}

// to prevent framework from loading a script/style sheet
// e.g., <script data-ignore="dont-load-prism-core.min.js-please "></script>
// REFACTOR
export function checkScriptIncludedOrIgnored(script: ScripFile) {
        for (var i = 0; i < scripts.length; i++)
                if (scripts[i].getAttribute('src')?.includes(script.name)
                        ||
                        scripts[i].getAttribute('data-ignore')?.includes(script.name))
                        return true;
        return false;
}

export function checkStyleSheetIncludedOrIgnored(sheet: StyleSheetFile) {
        for (var i = 0; i < links.length; i++)
                if (links[i].getAttribute('href')?.includes(sheet.name)
                        ||
                        links[i].getAttribute('data-ignore')?.includes(sheet.name))
                        return true;
        return false;
}
