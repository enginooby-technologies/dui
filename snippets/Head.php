<?php
/* 
USAGE: 
        Head('A title')
        ->css('style1.css')
        ->css('style2.css')
        ->show();
OR:
        Head('A title', ['style1.css', 'style2.css'])->show();
*/

// make code strongly-typed
declare(strict_types=1);

// delegate class instance init to a function to ease usage
// e.g. instead of (new Head('title'))->show(), write Head('title')->show()
function Head(string $title, array $cssHrefs = [], ?Meta $meta = null): Head
{
        $meta = $meta ?? new Meta();
        return new Head($title, $cssHrefs, $meta);
}

class Head
{
        // use constructor property promotion
        public function __construct(
                // required member
                private string $title,
                // optional member with default value
                private array $cssHrefs = [],
                protected ?Meta $meta,
                //TODO: font preload
        ) {
        }

        // make builders/setters for optional members
        public function css(string $href)
        {
                array_push($this->cssHrefs, $href);
                return $this;
        }

        public function meta(
                string $charset = "UTF-8",
                string $author = null,
                string $description = null,
                string $keywords = null,
                string $viewport = "width=device-width, initial-scale=1.0, shrink-to-fit=no",
                string $revised = null,
                int $refresh = null,
                string $cookie = null,
                string $redirect = null,
                int $redirectDelay = null
        ) {
                $this->meta = new Meta();
                $this->meta->charset($charset)->author($author)->description($description)
                        ->keywords($keywords)->viewport($viewport)->revised($revised)
                        ->refresh($refresh)->cookie($cookie)->redirect($redirect, $redirectDelay);
                return $this;
        }

        // each component has show() method returning its HTML view
        public function show()
        {
                // shorten variables for its view (just to make the view file look better)
                $title = $this->title;
                $cssHrefs = $this->cssHrefs;
                $charset = $this->meta->charset;
                $author = $this->meta->author;
                $description = $this->meta->description;
                $keywords = $this->meta->keywords;
                $viewport = $this->meta->viewport;
                $revised = $this->meta->revised ?? date("Y-m-d H:i:s");
                $refresh = $this->meta->refresh;
                $redirect = $this->meta->redirect;
                $redirectDelay = $this->meta->redirectDelay ?? 0;
                $cookie = $this->meta->cookie;
                include "head_view.php";
                // return itself, allow to quickly duplicate: $component->show()->show()...
                return $this;
        }
}

class Meta
{
        public function __construct(
                public ?string $charset = "UTF-8",
                public ?string $author = null,
                public ?string $description = null,
                public ?string $keywords = null,
                public  ?string $viewport = "width=device-width, initial-scale=1.0, shrink-to-fit=no",
                // last time the document was updated, used by browsers while refreshing webpage
                public ?string $revised = null,
                // specify a duration after which  web page will keep refreshing automatically.
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
