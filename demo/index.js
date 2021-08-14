import { Button } from '../../dui-dom/js/basic/Button.js';
var btn1 = Button("btn1");
btn1.onClick = function (event) { return alert("Hi! I am " + btn1.label); };
