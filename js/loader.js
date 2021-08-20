import { jqueryMinJs } from "./references.js";
const scripts = document.getElementsByTagName("script");
const links = document.getElementsByTagName("link");
// HTML & PHP
// jquery-dependent
export function loadFile(filePath) {
  if (!checkScriptIncludedOrIgnored(jqueryMinJs)) {
    jqueryMinJs.onload = () => {
      return $.get(filePath, function (data) {
        $('body').append(data);
      });
    };
    loadScript(jqueryMinJs);
  }
  else {
    return $.get(filePath, function (data) {
      $('body').append(data);
    });
  }
}
// JS
export function loadScript(script) {
  console.log(`>>> Loading ${script.name.toLocaleUpperCase()} from ${script.src}`);
  const scriptElement = document.createElement('script');
  if (script.onerror)
    scriptElement.onerror = script.onerror;
  if (script.onload)
    scriptElement.onload = script.onload;
  scriptElement.src = script.src;
  if (script.isModule)
    scriptElement.type = "module";
  if (script.integrity) {
    scriptElement.integrity = script.integrity;
    scriptElement.crossOrigin = "anonymous";
    scriptElement.referrerPolicy = "no-referrer";
  }
  document.head.appendChild(scriptElement);
}
// CSS
function loadStyleSheet(sheet) {
  console.log(`>>> Loading ${sheet.name.toLocaleUpperCase()} from ${sheet.href}`);
  const link = document.createElement('link');
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
// REFACTOR: use Promise w/ async-await
// callback will excecute regardless the script is loaded or not
// in case load script, it will be guaranted to execute after finish loading
// This is used for loading a chain of scripts, when every of them is optional
// E.g. load jQuery -> Popper -> Bootstrap
export function tryLoadScript(script, callback) {
  var _a;
  let isFileNeeded = true;
  if (script.triggerClasses) {
    isFileNeeded = false;
    for (let className of script.triggerClasses) {
      if (document.querySelector("." + className))
        isFileNeeded = true;
      break;
    }
  }
  (_a = script.triggerClasses) === null || _a === void 0 ? void 0 : _a.forEach(className => {
    if (document.querySelector("." + className))
      isFileNeeded = true;
  });
  if (isFileNeeded && !checkScriptIncludedOrIgnored(script)) {
    if (callback)
      script.onload = callback;
    loadScript(script);
  }
  else {
    if (callback)
      callback();
  }
}
export function tryLoadStyleSheet(sheet) {
  var _a;
  let isFileNeeded = true;
  if (sheet.triggerClasses) {
    isFileNeeded = false;
    for (let className of sheet.triggerClasses) {
      if (document.querySelector("." + className))
        isFileNeeded = true;
      break;
    }
  }
  (_a = sheet.triggerClasses) === null || _a === void 0 ? void 0 : _a.forEach(className => {
    if (document.querySelector("." + className))
      isFileNeeded = true;
  });
  if (isFileNeeded && !checkStyleSheetIncludedOrIgnored(sheet))
    loadStyleSheet(sheet);
}
// to prevent framework from loading a script/style sheet
// e.g., <script data-ignore="dont-load-prism-core.min.js-please "></script>
// REFACTOR
export function checkScriptIncludedOrIgnored(script) {
  var _a, _b;
  for (var i = 0; i < scripts.length; i++)
    if (((_a = scripts[i].getAttribute('src')) === null || _a === void 0 ? void 0 : _a.includes(script.name))
      ||
      ((_b = scripts[i].getAttribute('data-ignore')) === null || _b === void 0 ? void 0 : _b.includes(script.name)))
      return true;
  return false;
}
export function checkStyleSheetIncludedOrIgnored(sheet) {
  var _a, _b;
  for (var i = 0; i < links.length; i++)
    if (((_a = links[i].getAttribute('href')) === null || _a === void 0 ? void 0 : _a.includes(sheet.name))
      ||
      ((_b = links[i].getAttribute('data-ignore')) === null || _b === void 0 ? void 0 : _b.includes(sheet.name)))
      return true;
  return false;
}
export function getDependencies(ref) {
  var _a;
  let dependencies = [];
  for (var i = 0; i < scripts.length; i++) {
    if ((_a = scripts[i].getAttribute('data-dependency')) === null || _a === void 0 ? void 0 : _a.includes(ref)) {
      const scriptSrc = scripts[i].getAttribute('data-src');
      const dependentScript = { src: scriptSrc, name: scriptSrc };
      dependencies.push(dependentScript);
    }
  }
  return dependencies;
}
