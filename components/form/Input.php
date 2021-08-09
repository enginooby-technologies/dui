<?php

declare(strict_types=1);

function Input(?string $id = null, ?string $name = null, ?string $placeholder = null, ?bool $isRequired = false, ?string $wrapperClass = null): Input
{
        return new Input($id, $name, $placeholder, $isRequired, $wrapperClass);
}

class Input
{
        public function __construct(
                private ?string $id,
                private ?string $name,
                private ?string $placeholder,
                private ?bool $isRequired,
                private ?string $wrapperClass
        ) {
        }

        public function show()
        {
                $idAttr = $this->id ? "id='$this->id'" : '';
                $nameAttr = $this->name ? "name='$this->name'" : '';
                $placeholder = $this->placeholder ? "placeholder='$this->placeholder'" : '';
                $requiredAttr = $this->isRequired ? 'required' : '';
                $wrapperClass = $this->wrapperClass;
                include "input_view.php";
        }
}
