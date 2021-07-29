<?php

declare(strict_types=1);

function Button(string $label, string $id = null, string $href = 'javascript:;')
{
        $idAttr =  ($id) ? "id='$id'" : '';
        include "_button.php";
}
