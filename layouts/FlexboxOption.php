<?php
// CONSIDER: update to PHP 8.1 to use built-in enum
use MyCLabs\Enum\Enum;

include dirname(__FILE__) . "/../Enum.php";

class FlexboxOption
{
        public function __construct(
                // can not init default enum value => init when create flexbox instead 
                public ?JustifyContent $justifyContent = null,
                public ?Direction $direction = null,
        ) {
        }
}
final class JustifyContent extends Enum
{
        const Start = "start";
        const End = "end";
        const Center = "center";
        const Between = "between";
        const Around = "around";
}

final class Direction extends Enum
{
        const Row = "row";
        const RowReverse = "row-reverse";
        const Column = "column";
        const ColumnReverse = "column-reverse";
}
