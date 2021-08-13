<?php

declare(strict_types=1);
include_once __DIR__ . "/../Component.php";

function Checkbox(string $label, ?string $value = null, bool $checked = false, ?string $id = null, string $wrapperClass = '', string $class = '', ?string $onclick = null)
{
        return new Checkbox($label, $value, $checked, $id, $class, $wrapperClass, $onclick);
}

class Checkbox extends Component
{
        use TLabel;
        use TValue;
        use TChecked;

        public function __construct(
                protected string $label,
                protected ?string $value = null,
                protected bool $checked = false,

                ?string $id = null,
                string $class = '',
                string $wrapperClass = '',
                ?string $onclick = null,
                string $view = '/form/checkbox_view.php',
        ) {
                $id = $id ?? parent::formatToId('checkbox', $label);
                parent::__construct($id, $class, $wrapperClass, $onclick, $view);
        }
}
