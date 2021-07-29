<?php

declare(strict_types=1);

include dirname(__FILE__) . "/../../utils/formatter.php";

function Radio(string $id = null, float $value, string $label, string $group)
{
        $id = $id ?? labelToId($label);
        include "_radio.php";
}

function RangeSlider(string $id = null, string $label, float  $min = 0, float $max, float $step = 0.1, float $value = null)
{
        $id = $id ?? labelToId($label);
        $value = $value ?? $min;
        include "_range-slider.php";
}

function Toggle(string $label, string $id = null, string $name = null, float $value = 0)
{
        $id = $id ?? labelToId($label);
        $name = $name ?? $id;
        include "_toggle.php";
}
