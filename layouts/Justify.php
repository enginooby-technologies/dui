<?php
// CONSIDER: update to PHP 8.1 to use built-in enum
use MyCLabs\Enum\Enum;

include dirname(__FILE__) . "/../Enum.php";

final class Justify extends Enum
{
        const Start = "start";
        const End = "end";
        const Center = "center";
        const Between = "between";
        const Around = "around";
}
