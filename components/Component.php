<?php

declare(strict_types=1);

interface IShowable
{
        public function show();
}

abstract class Component implements IShowable
{
        public function __construct(
                protected ?string $id = null,
                protected ?string $class = '',
                protected ?string $wrapperClass = '',
                //better use addEventListener(), but for quick test:
                protected ?string $onclick = null,
                // HTML view file url relative to this Component file
                protected string $view
        ) {
        }

        public function show()
        {
                include __DIR__ . "/preprocess_view.php";
                include __DIR__ . $this->view;
                return $this;
        }

        public function id(string $id)
        {
                $this->id = $id;
                return $this;
        }

        public function class(string $name, bool $append = true)
        {
                $this->class = $append ? ($this->class . ' ' . $name) : $name;
                return $this;
        }

        public function wrapperClass(string $name, bool $append = true)
        {
                $this->wrapperClass = $append ? ($this->wrapperClass . ' ' . $name) : $name;
                return $this;
        }

        public function onclick(string $function)
        {
                $this->onclick = $function;
                return $this;
        }

        protected function formatToId(string $componentType, string $label): string
        {
                return strtolower($componentType . '_' . str_replace(' ', '-', $label));
        }
}

// Usage: child class of Component having $label property uses trait TLabel to include its function (set label) => multiple inheritance
/* Toggle, Checkbox, Button*/
trait TLabel
{
        public function label(string $label)
        {
                $this->label = $label;
                return $this;
        }
}

trait THref
{
        public function href(string $link)
        {
                $this->href = $link;
                return $this;
        }
}

trait TName
{
        public function name(string $name)
        {
                $this->name = $name;
                return $this;
        }
}

trait TPlaceholder
{
        public function placeholder(string $value)
        {
                $this->placeholder = $value;
                return $this;
        }
}

trait TRequired
{
        public function required(bool $required)
        {
                $this->required = $required;
                return $this;
        }
}

/* Checkbox*/
trait TChecked
{
        public function checked(bool $isChecked)
        {
                $this->checked = $isChecked;
                return $this;
        }
}

/* Checkbox, Range slider , Toggle*/
trait TValue
{
        public function value(string $value)
        {
                $this->value = $value;
                return $this;
        }
}
