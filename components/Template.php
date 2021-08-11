<?php

declare(strict_types=1);
include_once __DIR__ . "/../Component.php";

function T(?string $id = null, string $wrapperClass = '', string $class = '', ?string $onclick = null)
{
        return new T($id, $class, $wrapperClass, $onclick);
}

class T extends Component
{
        // traits

        public function __construct(
                //protected members from traits

                ?string $id = null,
                string $class = '',
                string $wrapperClass = '',
                ?string $onclick = null,
                string $view = '/T/T_view.php', // TODO: change this
        ) {
                parent::__construct($id, $class, $wrapperClass, $onclick, $view);
        }
}
