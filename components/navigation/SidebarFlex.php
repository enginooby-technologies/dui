<?php

declare(strict_types=1);
include_once __DIR__ . "/../Component.php";
include_once __DIR__ . "/../../layouts/Flexbox.php";

function SidebarFlex(?FlexboxOption $option = null, array $components = [], string $class = '', string $componentClass = '')
{
  return new SidebarFlex($class, $componentClass, $components, $option);
}

class SidebarFlex extends Flexbox
{
  public function __construct(
    string $class = '',
    string $componentClass = '',  // add common class to each component wrapper
    array $components = [],
    private ?FlexboxOption $option = null,
    string $view = __DIR__ . '/sidebar_flex_view.php',
  ) {
    parent::__construct($class, $componentClass, $components, $option, $view);
  }

  public function Item(?string $label = null, string $href = "javascript:;", ?string $icon, bool $isActive = false)
  {
    $sidebarItem = new SidebarItem($label, $href, $icon, $isActive);
    array_push($this->components, $sidebarItem);
    return $this;
  }
}

class SidebarItem
{
  public function __construct(
    public ?string $label,
    public string $href,
    public ?string $icon,
    public bool $isActive,
  ) {
  }
}
