<?php

declare(strict_types=1);
include_once __DIR__ . "/../Component.php";

// TODO: include_once in _index.php
// TODO: add same builder method for Container class for shortcut
function Foobar(?string $id = null, string $wrapperClass = '', string $class = '', ?string $onclick = null)
{
  return new Foobar($id, $class, $wrapperClass, $onclick);
}

class Foobar extends Component
{
  // traits

  public function __construct(
    //protected members from traits

    // common members from Component
    ?string $id = null,
    string $class = '',
    string $wrapperClass = '',
    ?string $onclick = null,
    // TODO: setup view
    string $view = '/T/T_view.php',
  ) {
    parent::__construct($id, $class, $wrapperClass, $onclick, $view);
  }
}
