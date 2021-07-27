<?php
function Radio($id, $value)
{
        echo "
        <div class='radio-button-wrapper'>
                <input class='state' type='radio' name='app' id='$id' value='$value'>
                <label class='label' for='$id'>
                        <div class='indicator'></div>
                        <span class='text'></span>
                </label>
        </div>
        ";
}
