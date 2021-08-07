<?php

declare(strict_types=1);

include_once dirname(__FILE__) . "/../../utils/general.php";
include_once dirname(__FILE__) . "/../../utils/formatter.php";

function Button(string $label, string $id = null, string $href = 'javascript:;')
{
        $id = $id ?? "button_" . formatToId($label);
        ob_start();
        include "_button.php";
        return getHtmlOutputFromBuffer();
}
