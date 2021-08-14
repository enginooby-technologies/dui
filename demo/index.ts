import { Button } from '../../dui-dom/js/basic/Button.js'

const btn1 = Button("btn1")
btn1.onClick = event => alert(`Hi! I am ${btn1.label}`)

