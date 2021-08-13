<?php

declare(strict_types=1);
include_once __DIR__ . "/../Component.php";

function Input(?string $id = null, ?string $name = null, ?string $placeholder = null, ?bool $required = false, string $wrapperClass = '', string $class = '', ?string $onclick = null)
{
        return new Input($name, $placeholder, $required, $id, $class, $wrapperClass, $onclick);
}

// TODO: create Input base class for InputText, InputCheckbox, etc.
class Input extends Component
{
        use TName;
        use TPlaceholder;
        use TRequired;

        public function __construct(
                protected ?string $name,
                protected ?string $placeholder,
                protected ?bool $required,

                ?string $id = null,
                string $class = '',
                string $wrapperClass = '',
                ?string $onclick = null,
                string $view = '/form/input_view.php',
        ) {
                parent::__construct($id, $class, $wrapperClass, $onclick, $view);
        }
}
