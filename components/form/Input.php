<?php

declare(strict_types=1);
include_once __DIR__ . "/../Component.php";

function Input(?string $id = null, ?string $name = null, ?string $placeholder = null, ?bool $isRequired = false, string $wrapperClass = '', string $class = '', ?string $onclick = null): Input
{
        return new Input($name, $placeholder, $isRequired, $id, $class, $wrapperClass, $onclick);
}

class Input extends Component
{
        public function __construct(
                protected ?string $name,
                protected ?string $placeholder,
                protected ?bool $isRequired,

                ?string $id = null,
                string $class = '',
                string $wrapperClass = '',
                ?string $onclick = null,
                string $view = '/form/input_view.php',
        ) {
                parent::__construct($id, $class, $wrapperClass, $onclick, $view);;
        }
}
