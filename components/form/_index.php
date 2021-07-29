<?php

declare(strict_types=1);

function Radio(string $id, float $value, string $label = '', string $groupName)
{
        include "_radio.php";
}

require "Radio.php";
function RadioGroup(Radio ...$Radioes)
{
        include "_radio-group.php";
}

function RangeSlider(string $id, string $label, float  $min = 0, float $max, float $step = 0.1, float $value = null)
{
        $value = $value ?? $min;
        include "_range-slider.php";
}
