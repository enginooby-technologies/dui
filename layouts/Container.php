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

  function class(string $class)
  {
    $this->class = $class;
    return $this;
  }

  function componentClass(string $name)
  {
    $this->componentClass = $name;
    return $this;
  }

  function add($component)
  {
    array_push($this->components, $component);
    return $this;
  }

  // Create & add component directly. This shortens systax: 
  // instead of: Container()->add(Button())->add(Button())...
  // we have:      Container()->Button()->Button()...
  function Radio(?string $label = null, ?string $group = null, ?string $value = null, bool $checked = false, ?string $id = null, string $wrapperClass = '', string $class = '', ?string $onclick = null)
  {
    $component = new Radio($label, $group, $value, $checked, $id, $class, $wrapperClass, $onclick);
    $this->add($component);
    return $this;
  }

  function Button(?string $id = null, string $class = '', string $wrapperClass = '', string $label = '',  string $href = 'javascript:;', ?string $onclick = null)
  {
    $component =  new Button($label, $href, $id, $class, $wrapperClass, $onclick);
    $this->add($component);
    return $this;
  }

  function Input(?string $id = null, ?string $name = null, ?string $placeholder = null, ?bool $required = false, string $wrapperClass = '', string $class = '', ?string $onclick = null)
  {
    $component = new Input($name, $placeholder, $required, $id, $class, $wrapperClass, $onclick);
    $this->add($component);
    return $this;
  }

  function Toggle(?string $label = null, ?string $name = null, ?string $value = null, ?string $id = null, string $wrapperClass = '', string $class = '', ?string $onclick = null)
  {
    $component = new Toggle($label, $name, $value, $id, $class, $wrapperClass, $onclick);
    $this->add($component);
    return $this;
  }

  function Checkbox(string $label, ?string $value = null, bool $checked = false, ?string $id = null, string $wrapperClass = '', string $class = '', ?string $onclick = null)
  {
    $component = new Checkbox($label, $value, $checked, $id, $class, $wrapperClass, $onclick);
    $this->add($component);
    return $this;
  }

  function Sidebar(array $items = [], ?string $id = null, string $wrapperClass = '', string $class = '', ?string $onclick = null)
  {
    $component = new Sidebar($items, $id, $class, $wrapperClass, $onclick);
    $this->add($component);
    return $this;
  }
}
