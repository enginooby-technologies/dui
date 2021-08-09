<?php

declare(strict_types=1);

// @param $class contains additional classes beside the default "button" class, mostly for spacing
function Button(?string $id = null, string $class = '', string $label = '',  string $href = 'javascript:;', ?string $onclick = null): Button
{
        return  new Button($id, $class, $label, $href, $onclick);
}

// CONSIDER: make a base class with id & class members
class Button
{
        public function __construct(
                private ?string $id = null,
                private ?string $class = null,
                private string $label = '',
                private string $href = 'javascript:;',
                private ?string $onclick = null
        ) {
        }

        public function show()
        {
                $idAttr = $this->id ? "id='$this->id'" : '';
                $class = $this->class;
                $label = $this->label;
                $href = $this->href;
                $onclickAttr = $this->onclick ? "onclick='$this->onclick'" : '';
                include "button_view.php";
        }

        public function id($id)
        {
                $this->id = $id;
                return $this;
        }

        public function class($class)
        {
                $this->class = $class;
                return $this;
        }

        public function label($label)
        {
                $this->label = $label;
                return $this;
        }

        public function href($href)
        {
                $this->href = $href;
                return $this;
        }

        public function onclick($onclick)
        {
                $this->onclick = $onclick;
                return $this;
        }
}
