<?php

declare(strict_types=1);

function formatToId(string $label)
{
        return str_replace(' ', '-', strtolower($label));
}
