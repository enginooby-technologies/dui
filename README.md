# Dynamic UI Style Framework

For the purpose of effortless transforming any projects using CSS for styling (typically websites) with any UI styles,  while providing the flexibility for customizaztion at the runtime.

## Styles   (w/ class names)
### Current
<a id="style-names"></a>
+ Flat: ```flat-style```
+ Neumorphism: ```neu-style```
+ Glassmorphism: ```glass-style```

<details>
<summary><i>Plan</i></summary>
<!--Blank line on purpuse-->

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
</details>

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
1 - Reference to all of the dependencies CSS & JS.  
2 - Reference to the framework style sheet (after project style sheet):  
```      
  <link rel="stylesheet" href="<framework_folder_path>/css/dynamic-style.css" title="dynamic-style" type="text/css">
  ```  
If the styles are not applied,  the workaroud is importing ```dynamic-style.scss``` or ```dynamic-style.css``` in the project style sheet to compile into one CSS file.  
3 - Add [class name](#style-names) of the first wanted style to ```<body>```. Thoses class names are set in [Config.ts](ts/Config.ts) which are indentical to selectors in init SCSS file.  
Recommend: use Critical to extract critical CSS rules after this step. The rest of styles which are not applied at the first time have many unused rules slowing down page load time.  
4 - Reference to the framework script:  
```  
<script async src="<framework_folder_path>/built/DynamicTheme.js" type="module"></script>
```  
This script can be imported  asynchronously to reduce page time load since the framework also includes sample/init values for each style in CSS files for  website to use at the first time. This mean the script could be skip if just want to apply a pre-defined style without the "dynamic/runtime customization" ability.  
After load, the script will AJAX load ```setting.php``` which is a setting panel for dynamic customization.  
5 - Modify ```setting.php``` file path in [Config.ts](ts/Config.ts) based on the project: ```<framework_folder_path>/php/setting.php```

## Stylizing
### Global
+ Colours: scheme, highlight, classification (3 elements).
+ Border radius
+ Font
### Style Domain

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
.tg .tg-7btt{border-color:inherit;font-weight:bold;text-align:center;vertical-align:top}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-c3ow"></th>
    <th class="tg-7btt">Elements</th>
    <th class="tg-7btt"></th>
    <th class="tg-7btt"></th>
    <th class="tg-7btt"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-7btt"></td>
    <td class="tg-c3ow">Button</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
  </tr>
  <tr>
    <td class="tg-7btt">Flat</td>
    <td class="tg-c3ow">✔</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
  </tr>
  <tr>
    <td class="tg-7btt">Neumorphism</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
  </tr>
  <tr>
    <td class="tg-7btt">Glassmorphism</td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
  </tr>
</tbody>
</table>