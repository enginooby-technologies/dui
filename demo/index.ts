import { Button } from '../js/components/basic/Button.js'

// TODO: strict type for onClick method
Button("btn-1").onClick = (event, label) => {
        alert(`Hi. I am ${label}`)
}
