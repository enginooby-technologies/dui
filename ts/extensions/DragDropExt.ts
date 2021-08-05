// @ts-nocheck

export class DragDropExt {
        constructor() {
                this.setupDraggable(' .title-bar');
                this.setupResizable('.setting-panel');
                this.setupResizable('.container');
        }

        setupDraggable(selectors: string) {
                interact(selectors).draggable({
                        startAxis: 'x',
                        lockAxis: 'x',
                        // enable inertial throwing
                        inertia: true,
                        // keep the element within the area of it's parent
                        modifiers: [
                                interact.modifiers.restrictRect({
                                        restriction: 'body',
                                        endOnly: true
                                })
                        ],
                        // enable autoScroll
                        autoScroll: true,
                        listeners: {
                                move(event) {
                                        var target = event.target.parentElement; // move container containing this title-bar
                                        // keep the dragged position in the data-x/data-y attributes
                                        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                                        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                                        // translate the element
                                        target.style.webkitTransform = target.style.transform =
                                                'translate(' + x + 'px, ' + y + 'px)';
                                        // update the posiion attributes
                                        target.setAttribute('data-x', x);
                                        target.setAttribute('data-y', y);
                                },
                                // call this function on every dragend event
                                end(event) {
                                }
                        }
                });
                // invalidation.then(() => {
                //         interact('.draggable').unset();
                // });
        }

        setupResizable(selectors: string) {
                interact(selectors)
                        .resizable({
                                edges: { top: true, left: true, bottom: true, right: true },
                                listeners: {
                                        move: function (event) {
                                                let { x, y } = event.target.dataset

                                                x = (parseFloat(x) || 0) + event.deltaRect.left
                                                y = (parseFloat(y) || 0) + event.deltaRect.top

                                                Object.assign(event.target.style, {
                                                        width: `${event.rect.width}px`,
                                                        height: `${event.rect.height}px`,
                                                        transform: `translate(${x}px, ${y}px)`
                                                })

                                                Object.assign(event.target.dataset, { x, y })
                                        }
                                }
                        })
        }
}