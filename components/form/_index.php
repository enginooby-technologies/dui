<?php

declare(strict_types=1);

include_once "Input.php";
include_once "Checkbox.php";
include_once "Toggle.php";
include_once "Radio.php";

include_once dirname(__FILE__) . "/../../utils/formatter.php";
include_once dirname(__FILE__) . "/../../utils/general.php";

function RangeSlider(string $id = null, string $label, float  $min = 0, float $max, float $step = 0.1, float $value = null)
{
  $id = $id ?? "range-slider_" . formatToId($label);
  $value = $value ?? $min;

  ob_start();
  include "_range-slider.php";
  return getHtmlOutputFromBuffer();
}

function Dropdown(string $label, string $id, array ...$items)
{
  ob_start();
  include "_dropdown.php";
  return getHtmlOutputFromBuffer();
}
