<?php

declare(strict_types=1);
include_once "FlexboxOption.php";
include_once "Container.php";

function Flexbox(?FlexboxOption $option = null, array $components = [], string $class = '', string $componentClass = '')
{
  return new Flexbox($class, $componentClass, $components, $option);
}

class Flexbox extends Container
{
  public function __construct(
    string $class = '',
    string $componentClass = '',  // add common class to each component wrapper
    array $components = [],
    private ?FlexboxOption $option = null,
    string $view = 'flexbox_view.php'
  ) {
    parent::__construct($class, $componentClass, $components, $view);
  }

  public function show()
  {
    $class = $this->class;
    $justifyContent = $this->option?->justifyContent ?? JustifyContent::Default();
    $direction = $this->option?->direction ?? Direction::Default();
    $components = $this->components;
    $componentClass = $this->componentClass;
    foreach ($components as $component) {
      if (is_a($component, 'Component')) {
        $component->wrapperClass($componentClass);
      }
    }
    include $this->view;
    return $this;
  }
}
