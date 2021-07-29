<?php

declare(strict_types=1);
// https://getbootstrap.com/docs/4.0/utilities/flex
include_once "FlexboxOption.php";

// usage 1: Flexbox(null, $component1, $component2...); // pass null option
// usage 2: Flexbox(components: $component1.$component2....) // use named arg with only 1 param - combination of variadic params
// usage 3: Flexbox(new FlexboxOption(Direction::Coloumn()), $component1, $component2...); // pass any number of options for FlexboxOption
function Flexbox(FlexboxOption $option = null, string ...$components)
{
        $justifyContent = $option?->justifyContent ?? JustifyContent::Center();
        $direction = $option?->direction ?? Direction::Row();
        include "_flexbox.php";
}
