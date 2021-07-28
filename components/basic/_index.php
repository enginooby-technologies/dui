<?php
function Button($label, $id = null, $href = '#')
{
        $idAttr =  ($id) ? "id='$id'" : '';
        include "_button.php";
}
