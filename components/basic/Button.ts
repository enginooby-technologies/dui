import { Component } from "../Component.js";

export const Button = (id: string) => new ButtonComponent(id);

export type ButtonEventHandler = (event: Event, label: string) => void;
class ButtonComponent extends Component {
        public label: string;
        public onClick?: ButtonEventHandler;

        constructor(
                id: string
        ) {
                super(id);
                this.label = this.element.textContent!
                this.onClick = undefined;
                this.setupOnClick();
        }

        public setupOnClick() {
                this.element.addEventListener('click', event => this.onClick!(event, this.label))
        }
}