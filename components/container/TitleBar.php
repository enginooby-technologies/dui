<?php

declare(strict_types=1);

function TitleBar(string $title = ''): TitleBar
{
        return new  TitleBar($title);
}

class TitleBar
{
        public function __construct(
                private string $title = ''
        ) {
        }

        public function show()
        {
                $title = $this->title;
                include "title_bar_view.php";
                return $this;
        }
}
