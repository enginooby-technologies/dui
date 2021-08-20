<?php

declare(strict_types=1);

// TODO: separate init for root and each style
class Initializer
{
  public function __construct(
    public ?string $schemeColor = null,
    public ?string $primaryColor = null,
  ) {
  }
}
