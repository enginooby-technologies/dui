<?php

declare(strict_types=1);

class Color
{
        public static function toRgbComponents(?string $color)
        {
                if (!$color) return null;
                // hex value
                if (str_contains($color, '#')) {
                        list($r, $g, $b) = sscanf($color, "#%02x%02x%02x");
                        return "$r, $g, $b";
                }

                // TODO: convert rgb()

                // TODO: conver hsl()

                return $color;
        }
}
