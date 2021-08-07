# Dynamic UI  Framework

The framework manipulates CSSStyleRule to achieve dynamic customization, defines PHP functions for HTML component reusing and delegates layouting  to Bootstrap with supporting OOP ("strongly-typed Bootstrap").

## Styles   (w/ class names)
### Current
<a id="style-names"></a>
+ Flat: ```flat-style```
+ NES/Pixel: ```nes-style```
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
+ Arcade
+ Grid
+ 3D
+ Windows
+ Browser
+ Monograph
+ Vintage/Retro
+ Rainbow
+ Textbook
</details>

## Dependencies
1. Required:
  + Bootstrap 4 [.css,  .js] (for layout, will be updated to version 5 to be independent with jQuery & FontAwesome)
  + jQuery [.js] (will be removed)
  + Popper [.js] (for dropdown component, will be removed)
  +  Animate [.css] (for animation) 
  2. Lazy loading by framework:
  + TinyColor [.js] (for color manipulation, will be removed) 
  + Webfont [.js] (for dynamic font loading) 
  + Interactive [.js] (for drag&drop extension) 
  3. Deferred loading by framework:
+ Prism [.css], Prism core [.js] & Prism autoloader [.js] (for code block syntax highlight): only be loaded  if Code block (with class 'code-block') is used in page && the files are not already included in index.html/php
4. Optional:
 + FontAwesome [.css] (for icons, will be removed)


## Installation
### For development (optional)
Skip if use framework w/o modification
1. SCSS
2. PHP
3. TypeScript & npm
4. Gulp

### For usage
1 - Refer to the framework style sheet (after project style sheet):  
```      
  <link rel="stylesheet" href="<framework_folder_path>/css/dynamic-style.css" type="text/css">
  ```  
2 - Refer to the framework script:  
```  
<script async src="<framework_folder_path>/js/DynamicUI.js" type="module"></script>
```  
This script can be imported  asynchronously to reduce page time load since the framework also includes sample/init values for each style in CSS files for  website to use at the first time. This means the script could be skipped if just want to apply a pre-defined style without the "dynamic/runtime customization" ability.  
After load, the script will AJAX load ```setting.html``` which is a setting panel for dynamic customization.  

## Usage
### Initializations
Any dynamic properties could be initialized at the first time by simply adding pre-defined class names or re-setting SCSS variables:
  + Initial style: add style [class name](#style-names) to ```<body>```. Class names are set in [Config.ts](ts/Config.ts) which are indentical to selectors in [initial SCSS files](./scss/init).  
  + Initial style properties
  + Initial color
  + Initial background: add pre-defined [background class name](./backgrounds) or a custom background with name of ```custom-bg```  to ```<body>```
  + Initial border
  + Initial overlay
  + Initial font

Recommend: use Critical to extract critical CSS rules after all initializations. The rest of styles which are not applied at the first time have many unused rules slowing down page load time.  

## Demos
A few projects I have built making use of this framework:  
  + [Portfolio](https://enginoobz.com/)
  + [Corona Checker](https://enginoobz.com/projects/corona-checker/)

## Credits
+ [NES.css](https://github.com/nostalgic-css/NES.css)
+ [98.css](https://github.com/jdan/98.css)
+ [PHP Enum](https://github.com/myclabs/php-enum)      
  
  And other authors of CSS code, backgrounds... noted in according source files.

## Stylizing
### Global
+ Colours: scheme, highlight, classification (3 elements).
+ Font: family, line height, letter spacing, size scale (w/o affecting other elements)
+ Border: radius
+ Background: outer & inner
+ Overlay
  
### Basic Components

|               	| Button 	| Badge 	| Divider 	| Spinner 	| Progress bar 	|
|:-------------:	|:------:	|:-----:	|:-------:	|:-------:	|:------------:	|
|      Flat     	|    ✓   	|   ✓   	|         	|         	|              	|
|  Neumorphism  	|    ✓   	|   ✓   	|         	|         	|              	|
| Glassmorphism 	|    ✓   	|   ✓   	|         	|         	|              	||              	|


### Container Components
> Wrappers for other components

|               	| Table 	| Box 	| Modal 	| Alert 	| Card 	| Carousel 	| Toast 	| Tab 	| Tooltip 	|
|:-------------:	|:-----:	|:---:	|:-----:	|:-----:	|:----:	|:--------:	|:-----:	|:---:	|:-------:	|
|      Flat     	|       	|     	|       	|       	|      	|          	|       	|     	|         	|
|  Neumorphism  	|       	|     	|       	|       	|      	|          	|       	|     	|         	|
| Glassmorphism 	|       	|     	|       	|       	|      	|          	|       	|     	|         	|


### Content Components
> Messages, media

|               	| Heading 	| Title 	| Paragraph 	| Quote 	| Icon 	| Image 	| Video 	| Iframe 	|
|:-------------:	|:-------:	|:-----:	|:---------:	|:-----:	|:----:	|:-----:	|:-----:	|:------:	|
|      Flat     	|         	|       	|           	|       	|      	|       	|       	|        	|
|  Neumorphism  	|         	|       	|           	|       	|      	|       	|       	|        	|
| Glassmorphism 	|         	|       	|           	|       	|      	|       	|       	|        	|

### Form Components
> Taking input to perform actions

|               	| Checkbox 	| File 	| Input 	| Text area 	| Dropdown/Select 	| Multiple select 	| Radio 	| Segmented control 	| Range slider 	| Switch 	| Color picker 	|
|:-------------:	|:--------:	|:----:	|:-----:	|:---------:	|:---------------:	|:---------------:	|:-----:	|:-----------------:	|:------------:	|:------:	|:------------:	|
|      Flat     	|     ✓    	|      	|   ✓   	|     ✓     	|                 	|                 	|   ✓   	|         ✓         	|              	|        	|              	|
|  Neumorphism  	|     ✓    	|      	|   ✓   	|     ✓     	|                 	|                 	|   ✓   	|         ✓         	|       ✓      	|    ✓   	|              	|
| Glassmorphism 	|          	|      	|       	|           	|                 	|                 	|       	|         ✓         	|              	|        	|              	|

### Navigation Components
> Navigating on the page

|               	| Navbar 	| Scrollbar 	| Pagination 	| Bread crumb 	|
|:-------------:	|:------:	|:---------:	|:----------:	|:-----------:	|
|      Flat     	|        	|           	|            	|             	|
|  Neumorphism  	|        	|           	|            	|             	|
| Glassmorphism 	|        	|           	|            	|             	|