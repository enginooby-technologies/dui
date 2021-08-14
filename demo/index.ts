import { Button } from '../js/components/basic/Button.js'

const btn1 = Button("btn1")
btn1.onClick = event => alert(`Hi! I am ${btn1.label}`)

