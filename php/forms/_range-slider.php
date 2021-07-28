<?php
function RangeSlider($label, $id, $min = 0, $max, $step = 0.1, $value = null)
{
        $value = $value ?? $min;
        echo "
        <div class='range-slider'>
                <label for='$id'>$label</label>
                <input class='range-slider__range' id='$id' type='range' min='$min' max='$max' step='$step' value='$value'>
                <span class='range-slider__value'>$value</span>
        </div>
        ";
}
