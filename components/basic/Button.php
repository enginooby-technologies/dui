<?php

declare(strict_types=1);
include_once __DIR__ . "/../Component.php";

function Button(?string $id = null, string $class = '', string $wrapperClass = '', string $label = '',  string $href = 'javascript:;', ?string $onclick = null)
{
        return  new Button($label, $href, $id, $class, $wrapperClass, $onclick);
}

class Button extends Component
{
        use TLabel;
        use THref;

        public function __construct(
                protected string $label = '',
                protected string $href = 'javascript:;',

                ?string $id = null,
                string $class = '',
                string $wrapperClass = '',
                ?string $onclick = null,
                string $view = '/basic/button_view.php',
        ) {
                parent::__construct($id, $class, $wrapperClass, $onclick, $view);;
        }
}
