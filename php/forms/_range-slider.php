<?php
function RangeSlider($label, $id, $min, $max, $step = 0.1, $value = '')
{
        echo "
        <div class='range-slider'>
                <label for='$id'>$label</label>
                <input class='range-slider__range' id='$id' type='range' min='$min' max='$max' step='$step'>
                <span class='range-slider__value'>$value</span>
        </div>
        ";
}
