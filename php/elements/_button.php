<?php
//TODO: RadioButtonGroup()
function Button($label, $id = null, $href = '#')
{
        $idAttr =  ($id) ? "id='$id'" : '';
        echo "
        <div class='button-border'>
                <a href='$href' class='button' $idAttr>$label</a>
        </div>
        ";
}
