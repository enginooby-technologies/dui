<?php
// CONSIDER: update to PHP 8.1 to use built-in enum
use MyCLabs\Enum\Enum;

include_once dirname(__FILE__) . "/../Enum.php";

// https://getbootstrap.com/docs/4.0/utilities/flex
class FlexboxOption
{
  public function __construct(
    // can not init default enum value => define default in enum and init when create flexbox instead 
    public ?JustifyContent $justifyContent = null,
    public ?Direction $direction = null,
    public ?Basis $basis = null,
  ) {
  }
}

// https://getbootstrap.com/docs/4.0/utilities/flex/#justify-content
final class JustifyContent extends Enum
{
  const Default = "justify-content-center";
  const Start = "justify-content-start";
  const End = "justify-content-end";
  const Center = "justify-content-center";
  const Between = "justify-content-between";
  const Around = "justify-content-around";
}

// https://getbootstrap.com/docs/4.0/utilities/flex/#direction
final class Direction extends Enum
{
  const Default = "flex-row";
  const Row = "flex-row";
  const RowReverse = "flex-row-reverse";
  const Column = "flex-column";
  const ColumnReverse = "flex-column-reverse";
}

final class Basis extends Enum
{
  const Default = "flex-basis-0pc";
  const Content = "flex-basis-content";
  const Pc0 = "flex-basis-0pc";
  const Pc10 = "flex-basis-10pc";
  const Pc20 = "flex-basis-20pc";
  const Pc30 = "flex-basis-30pc";
  const Pc40 = "flex-basis-40pc";
  const Pc50 = "flex-basis-50pc";
}

// https://getbootstrap.com/docs/4.0/utilities/flex/#align-content
// TODO: AlignItems

// https://getbootstrap.com/docs/4.0/utilities/flex/#align-items
//T ODO: AlignContent

// https://getbootstrap.com/docs/4.0/utilities/flex/#wrap
// TODO: Wrap

// https://getbootstrap.com/docs/4.0/utilities/flex/#enable-flex-behaviors
// TODO: Inline (bool?)