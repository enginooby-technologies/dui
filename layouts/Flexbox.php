<?php

declare(strict_types=1);
include_once "FlexboxOption.php";

function Flexbox(?FlexboxOption $option = null, array $components = [], string $class = ''): Flexbox
{
        return new Flexbox($class, $components, $option);
}

class Flexbox
{
        public function __construct(
                private string $class = '',
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
                include "flexbox_view.php";
                return $this;
        }

        public function class($class)
        {
                $this->class = $class;
                return $this;
        }

        public function add($component)
        {
                array_push($this->components, $component);
                return $this;
        }
}
