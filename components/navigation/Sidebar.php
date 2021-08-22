<?php

declare(strict_types=1);
include_once __DIR__ . "/../Component.php";

function Sidebar(array $items = [], ?string $id = null, string $wrapperClass = '', string $class = '', ?string $onclick = null)
{
  return new Sidebar($items, $id, $class, $wrapperClass, $onclick);
}

class Sidebar extends Component
{
  public function __construct(
    //protected members from traits
    protected array $items,

    // common members from Component
    ?string $id = null,
    string $class = '',
    string $wrapperClass = '',
    ?string $onclick = null,
    string $view = '/navigation/sidebar_view.php',
  ) {
    parent::__construct($id, $class, $wrapperClass, $onclick, $view);
  }

  public function Item(?string $label = null, string $href = "javascript:;", ?string $icon, bool $isActive = false)
  {
    $sidebarItem = new SidebarItem($label, $href, $icon, $isActive);
    array_push($this->items, $sidebarItem);
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
