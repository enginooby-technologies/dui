# Dynamic UI Style Framework

For the purpose of effortless transforming any projects using CSS for styling (typically websites) with any UI styles,  while providing the flexibility for customizaztion at the runtime.

## Styles   (w/ class names)
### Current
+ Flat: ```flat-style```
+ Neumorphism: ```neu-style```
+ Glassmorphism: ```glass-style```
### Plan
+ Material
+ Skeuomorphism
+ Gradient
+ Neon
+ Cyberpunk
+ Metalic
+ NES/Pixel
+ Grid
+ Windows
+ Monograph
  
## Dependencies
  + Bootstrap 4
  + jQuery
  + TinyColor

## Setup (optional)
Skip if just use the framework without modification
1. SCSS
2. PHP: If not use PHP, simply convert into HTML files
3. TypeScript

## Usage
1. Reference to all of the dependencies CSS & JS.
2. Reference to the framework style sheet (after project style sheet):  
```        <link rel="stylesheet" href="<framework_folder_path>/css/dynamic-style.css" title="dynamic-style" type="text/css">```  
If the styles are not applied,  the workaroud is importing ```dynamic-style.scss``` or ```dynamic-style.css``` in the project style sheet to compile into one CSS file.
3. Add class name of the first wanted style to ```<body>```. Thoses class names are set in its style TS files.  
Recommend: use Critical to extract critical CSS rules after this step. The rest of styles which are not applied at the first time have many unused rules slowing down page load time.
4. Reference to the framework script:  
```  <script async src="<framework_folder_path>/built/DynamicTheme.js" type="module"></script>```  
This script can be imported  asynchronously to reduce page time load since the framework also includes sample/init values for each style in CSS files for  website to use at the first time. This mean the framework could be skip if just want to apply a style without the "dynamic/runtime customization" ability.
After loaded, the script will AJAX load ```setting.php``` which is a setting panel for dynamic customization.
