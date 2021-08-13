<?php

declare(strict_types=1);
include_once __DIR__ . "/../components/_index.php";

// interface IContainer
// {
//         public function add();
// }

abstract class Container
{
        public function __construct(
                protected string $class = '',
                protected string $componentClass = '',  // add common class to each component wrapper
                protected array $components = [],
        ) {
        }

        public function class(string $class)
        {
                $this->class = $class;
                return $this;
        }

        public function componentClass(string $name)
        {
                $this->componentClass = $name;
                return $this;
        }

        public function add($component)
        {
                array_push($this->components, $component);
                return $this;
        }

        // Create & add component directly. This shortens systax: 
        // instead of: Container()->add(Button())->add(Button())...
        // we have:      Container()->Button()->Button()...
        public function Radio(?string $label = null, ?string $group = null, ?string $value = null, bool $checked = false, ?string $id = null, string $wrapperClass = '', string $class = '', ?string $onclick = null)
        {
                $component = new Radio($label, $group, $value, $checked, $id, $class, $wrapperClass, $onclick);
                $this->add($component);
                return $this;
        }
}
