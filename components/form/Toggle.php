<?php

declare(strict_types=1);
include_once __DIR__ . "/../Component.php";

function Toggle(?string $label = null, ?string $name = null, ?string $value = null, ?string $id = null, string $wrapperClass = '', string $class = '', ?string $onclick = null)
{
  return new Toggle($label, $name, $value, $id, $class, $wrapperClass, $onclick);
}

class Toggle extends Component
{
  use TName;
  use TLabel;
  use TValue;

  public function __construct(
    protected ?string $label = null,
    protected ?string $name = null,
    protected ?string $value = null,

    ?string $id = null,
    string $class = '',
    string $wrapperClass = '',
    ?string $onclick = null,
    string $view = '/form/toggle_view.php',
  ) {
    $id = $id ?? parent::formatToId('toggle', $label);
    parent::__construct($id, $class, $wrapperClass, $onclick, $view);
  }
}
