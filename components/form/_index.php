<?php

declare(strict_types=1);

include_once dirname(__FILE__) . "/../../utils/formatter.php";
include_once dirname(__FILE__) . "/../../utils/general.php";

function Radio(string $id = null, float $value, string $label, string $group, bool $checked = false): string
{
        $id = $id ?? formatToId($label);
        $checkedAttr = ($checked) ? "checked" : "";
        ob_start();
        include "_radio.php";
        return getHtmlOutputFromBuffer();
}

function RangeSlider(string $id = null, string $label, float  $min = 0, float $max, float $step = 0.1, float $value = null)
{
        $id = $id ?? "range-slider_" . formatToId($label);
        $value = $value ?? $min;

        ob_start();
        include "_range-slider.php";
        return getHtmlOutputFromBuffer();
}

//TODO: use string type for value to cover more cases
function Toggle(string $label, string $id = null, string $name = null, float $value = 0)
{
        $id = $id ?? "toggle_" . formatToId($label);
        $name = $name ?? formatToId($label);

        ob_start();
        include "_toggle.php";
        return getHtmlOutputFromBuffer();
}

function Checkbox(string $name, string $id = null, string $value = null, bool $checked = false)
{
        $id = $id ?? "checkbox_" . formatToId($name);
        $value = $value ?? formatToId($name);
        $checkedAttr = ($checked) ? "checked" : "";

        ob_start();
        include "_checkbox.php";
        return getHtmlOutputFromBuffer();
}

function Dropdown(string $label, string $id, array ...$items)
{
        ob_start();
        include "_dropdown.php";
        return getHtmlOutputFromBuffer();
}
