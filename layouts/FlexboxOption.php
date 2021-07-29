<?php
// CONSIDER: update to PHP 8.1 to use built-in enum
use MyCLabs\Enum\Enum;

include dirname(__FILE__) . "/../Enum.php";

// https://getbootstrap.com/docs/4.0/utilities/flex
class FlexboxOption
{
        public function __construct(
                // can not init default enum value => define default in enum and init when create flexbox instead 
                public ?JustifyContent $justifyContent = null,
                public ?Direction $direction = null,
        ) {
        }
}

// https://getbootstrap.com/docs/4.0/utilities/flex/#justify-content
final class JustifyContent extends Enum
{
        const Default = "center";
        const Start = "start";
        const End = "end";
        const Center = "center";
        const Between = "between";
        const Around = "around";
}

// https://getbootstrap.com/docs/4.0/utilities/flex/#direction
final class Direction extends Enum
{
        const Default = "row";
        const Row = "row";
        const RowReverse = "row-reverse";
        const Column = "column";
        const ColumnReverse = "column-reverse";
}

// https://getbootstrap.com/docs/4.0/utilities/flex/#align-content
// TODO: AlignItems

// https://getbootstrap.com/docs/4.0/utilities/flex/#align-items
//T ODO: AlignContent

// https://getbootstrap.com/docs/4.0/utilities/flex/#wrap
// TODO: Wrap

// https://getbootstrap.com/docs/4.0/utilities/flex/#enable-flex-behaviors
// TODO: Inline (bool?)