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
function Head(string $title, array $cssHrefs = []): Head
{
        return new Head($title, $cssHrefs);
}

class Head
{
        // use constructor property promotion
        public function __construct(
                // required member
                private string $title,
                // optional member with default value
                private array $cssHrefs = []
        ) {
        }

        // make builders/setters for optional members
        public function css(string $href)
        {
                array_push($this->cssHrefs, $href);
                return $this;
        }

        // each component has show() method returning its HTML view
        public function show()
        {
                // shorten variables for its view (just to make the view file look better)
                $title = $this->title;
                $cssHrefs = $this->cssHrefs;
                include "head_view.php";
                // return itself, allow to quickly duplicate: $component->show()->show()...
                return $this;
        }
}
