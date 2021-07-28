<?php
function Radio($id, $value, $label = '')
{
        include "_radio.php";
}

function RangeSlider($id, $label, $min = 0, $max, $step = 0.1, $value = null)
{
        $value = $value ?? $min;
        include "_range-slider.php";
}
