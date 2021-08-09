<?php

declare(strict_types=1);

// include_once dirname(__FILE__) . "/../../utils/formatter.php";
include_once dirname(__FILE__) . "/../utils/general.php";

function Head(string $title, string ...$cssHref)
{
        ob_start();
        include "_head.php";
        return getHtmlOutputFromBuffer();
}
