<?php

declare(strict_types=1);

function Radio(string $id, float $value, string $label = "", string $group)
{
        include "_radio.php";
}

function RangeSlider(string $id, string $label, float  $min = 0, float $max, float $step = 0.1, float $value = null)
{
        $value = $value ?? $min;
        include "_range-slider.php";
}

function Toggle(string $label, string $id, string $name = null, string $value = "")
{
        $name = $name ?? $id;
        include "_toggle.php";
}
