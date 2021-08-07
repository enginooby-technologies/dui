<?php

declare(strict_types=1);

include_once dirname(__FILE__) . "/../../utils/general.php";
include_once dirname(__FILE__) . "/../../utils/formatter.php";

// @param $class contains additional classes beside the default "button" class, mostly for spacing
// TODO: change to $wrapperClass
function Button(string $label, string $id = null, string $href = 'javascript:;', string $class = '', string $onclick = null)
{
        $id = $id ?? "button_" . formatToId($label);
        $onclickAttr = $onclick ? "onclick=" . $onclick : "";
        ob_start();
        include "_button.php";
        return getHtmlOutputFromBuffer();
}
