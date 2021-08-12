<?php

declare(strict_types=1);

class Meta
{
        public function __construct(
                public ?string $charset = "UTF-8",
                public ?string $author = null,
                public ?string $description = null,
                public ?string $keywords = null,
                public ?string $viewport = "width=device-width, initial-scale=1.0, shrink-to-fit=no",
                // last time the document was updated, used by browsers while refreshing webpage
                public ?string $revised = null,
                // specify a duration after which web page will keep refreshing automatically.
                public ?int $refresh = null,
                public ?string $cookie = null,
                public ?string $redirect = null,
                public ?int $redirectDelay = null
        ) {
        }

        public function charset(?string $content)
        {
                $this->charset = $content;
                return $this;
        }

        public function author(?string $name)
        {
                $this->author = $name;
                return $this;
        }
        public function description(?string $content)
        {
                $this->description = $content;
                return $this;
        }

        public function keywords(?string $content)
        {
                $this->keywords = $content;
                return $this;
        }

        public function viewport(?string $content)
        {
                $this->viewport = $content;
                return $this;
        }

        public function revised(?string $lastTimeUpdate)
        {
                $this->revised = $lastTimeUpdate;
                return $this;
        }

        public function refresh(?int $second)
        {
                $this->refresh = $second;
                return $this;
        }

        public function cookie(?string $policy)
        {
                $this->cookie = $policy;
                return $this;
        }

        public function redirect(?string $link, ?int $delayInSecond)
        {
                $this->redirect = $link;
                $this->redirectDelay = $delayInSecond;
                return $this;
        }
}
