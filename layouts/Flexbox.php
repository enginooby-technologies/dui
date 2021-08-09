<?php

declare(strict_types=1);
include_once "FlexboxOption.php";

function Flexbox(?FlexboxOption $option = null, array $components = [], string $class = '', string $componentClass = ''): Flexbox
{
        return new Flexbox($class, $componentClass, $components, $option);
}

class Flexbox
{
        public function __construct(
                private string $class = '',
                // add common class to each component wrapper
                private string $componentClass = '',
                private array $components = [],
                private ?FlexboxOption $option = null
        ) {
        }

        public function show()
        {
                $class = $this->class;
                $justifyContent = $this->option?->justifyContent ?? JustifyContent::Default();
                $direction = $this->option?->direction ?? Direction::Default();
                $components = $this->components;
                $componentClass = $this->componentClass;
                foreach ($components as $component) {
                        $component->wrapperClass($componentClass);
                }
                include "flexbox_view.php";
                return $this;
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
}
