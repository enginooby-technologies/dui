<?php

declare(strict_types=1);

class Initializer
{
        public function __construct(
                public ?string $schemeColor = null,
                public ?string $highlightColor = null,
        ) {
        }
}
