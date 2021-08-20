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
function Head(string $title, array $cssHrefs = [], ?Meta $meta = null, ?Initializer $initializer = null): Head
{
  return new Head($title, $cssHrefs, $meta, $initializer);
}

class Head
{
  // use constructor property promotion
  public function __construct(
    // required member
    private string $title,
    // optional member with default value
    private array $cssHrefs = [],

    ?Meta $meta = null,
    ?Initializer $initializer = null,

    //TODO: font preload
  ) {
    $this->initializer = $initializer ?? new Initializer();
    $this->meta = $meta ?? new Meta();
  }

  // make builders/setters for optional members
  public function css(string $href)
  {
    array_push($this->cssHrefs, $href);
    return $this;
  }

  /**
   * Here an example of the italics tag: <<i>>Hello, world!<<i>>
   */
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

  public function init(?string $schemeColor = null, ?string $highlightColor = null)
  {
    $this->initializer = new Initializer($schemeColor, $highlightColor);
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

    $schemeColor = Color::toRgbComponents($this->initializer->schemeColor);
    $primaryColor = Color::toRgbComponents($this->initializer->primaryColor);

    include "head_view.php";
    // return itself, allow to quickly duplicate: $component->show()->show()...
    return $this;
  }
}
