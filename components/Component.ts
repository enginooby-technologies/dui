export abstract class Component {
        public element: Element;
        constructor(
                protected id: string
        ) {
                this.element = document.querySelector('#' + id)!;
        }

        // abstract onClick(): void;
}