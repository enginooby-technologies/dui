<?php

declare(strict_types=1);

function phpToHtml(string $phpInputPath, string $htmlOutputPath = null)
{
        $htmlOutputPath = $htmlOutputPath ??  str_replace('.php', '.html', $phpInputPath);
        ob_start();
        include_once $phpInputPath;
        file_put_contents($htmlOutputPath, ob_get_clean());
}
