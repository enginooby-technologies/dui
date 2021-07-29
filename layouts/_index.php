<?php

declare(strict_types=1);
// https://getbootstrap.com/docs/4.0/utilities/flex/#justify-content
include_once "FlexboxOptions.php";

//CONSIDER: use variadic param for $component
//, downside: must use ...$component  as final param -> must to specify even optional params each invoke
function Flexbox(string $components, JustifyContent $justifyContent = null, Direction $direction = null)
{
        $justifyContent = $justifyContent ?? JustifyContent::Center();
        $direction = $direction ?? Direction::Row();
        include "_flexbox.php";
}
