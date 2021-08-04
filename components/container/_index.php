<?php

declare(strict_types=1);

include_once dirname(__FILE__) . "/../../utils/general.php";

function TitleBar(string $title)
{
        ob_start();
        include "_title-bar.php";
        return getHtmlOutputFromBuffer();
}

// @param $currentTabSize: number of spaces per tab configured in the editor
function CodeBlock(string $language, string $code, int $outdent = 0,  int $currentTabSize = 8)
{
        formatSpecialCharacters($code);
        outdentCodeBlock($code, $outdent, $currentTabSize);
        changeTabSizeInCode($code, $currentTabSize, 2);

        include "_code-block.php";
}


function formatSpecialCharacters(string &$code)
{
        $code = str_replace("<", "&lt;", $code);
        $code = str_replace(">", "&gt;", $code);
        $code = str_replace("\\n", "
 ", $code);
}

// outdent every line so that the first line reaches top left
function outdentCodeBlock(string &$code, int $outdent, int $currentTabSize)
{
        $spacesToTrim = str_repeat(' ', $currentTabSize * $outdent);
        $code = str_replace($spacesToTrim, '', $code);
}

function changeTabSizeInCode(string &$code, int $currentTabSize, int $newTabSize)
{
        $currentSpacesPerTab = str_repeat(' ', $currentTabSize);
        $newSpacesPerTab = str_repeat(' ', $newTabSize);
        $code = str_replace($currentSpacesPerTab, $newSpacesPerTab, $code);
}
