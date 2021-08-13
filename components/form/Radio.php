<?php

declare(strict_types=1);
include_once __DIR__ . "/../Component.php";

function Radio(?string $label = null, ?string $group = null, ?string $value = null, bool $checked = false, ?string $id = null, string $wrapperClass = '', string $class = '', ?string $onclick = null)
{
        return new Radio($label, $group, $value, $checked, $id, $class, $wrapperClass, $onclick);
}

class Radio extends Component
{
        use TLabel;
        use TName;
        use TValue;
        use TChecked;

        public function __construct(
                protected ?string $label = null,
                protected ?string $name = null, // indicate which group the radio belong to
                protected ?string $value = null,
                protected ?bool $checked = false,

                ?string $id = null,
                string $class = '',
                string $wrapperClass = '',
                ?string $onclick = null,
                string $view = '/form/radio_view.php',
        ) {
                $id = $id ?? parent::formatToId('radio', $label);
                parent::__construct($id, $class, $wrapperClass, $onclick, $view);
        }
}
