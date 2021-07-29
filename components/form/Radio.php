<?php
class Radio
{
        public function __construct(
                public string $id,
                public string $label,
                public string $value,
                public string $groupName,
        ) {
        }
}
