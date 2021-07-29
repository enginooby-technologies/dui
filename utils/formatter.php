<?php

declare(strict_types=1);

function labelToId(string $label){
        return str_replace(' ','-', strtolower($label));
}
