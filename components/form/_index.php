<?php

declare(strict_types=1);

include dirname(__FILE__) . "/../../utils/formatter.php";

function Radio(string $id = null, float $value, string $label, string $group)
{
        $id = $id ?? formatToId($label);
        include "_radio.php";
}

function RangeSlider(string $id = null, string $label, float  $min = 0, float $max, float $step = 0.1, float $value = null)
{
        $id = $id ?? formatToId($label);
        $value = $value ?? $min;
        include "_range-slider.php";
}

//TODO: use string type for value to cover more cases
function Toggle(string $label, string $id = null, string $name = null, float $value = 0)
{
        $id = $id ?? formatToId($label);
        $name = $name ?? formatToId($label);
        include "_toggle.php";
}

function Checkbox(string $name, string $id = null, string $value = null)
{
        $id = $id ?? formatToId($name);
        $value = $value ?? formatToId($name);
        include "_checkbox.php";
}
