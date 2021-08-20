<?php

declare(strict_types=1);
include_once __DIR__ . "/../Component.php";

// @param $currentTabSize: number of spaces per tab configured in the editor
function CodeBlock(string $language, string $code = '', int $outdent = 0,  int $currentTabSize = 8, ?string $id = null, string $class = '',  string $wrapperClass = '', ?string $onclick = null): CodeBlock
{
  return new CodeBlock($code, $language, $outdent, $currentTabSize, $id, $class, $wrapperClass, $onclick);
}

class CodeBlock extends Component
{
  public function __construct(
    protected string $code,
    protected string $language,
    protected int $outdent = 0,
    protected $currentTabSize = 8,

    ?string $id = null,
    string $class = '',
    string $wrapperClass = '',
    ?string $onclick = null,
    string $view = '/container/code_block_view.php',
  ) {

    parent::__construct($id, $class, $wrapperClass, $onclick, $view);
  }

  public function show()
  {
    $this->formatSpecialCharacters($this->code);
    $this->outdentCodeBlock($this->code, $this->outdent, $this->currentTabSize);
    $this->changeTabSizeInCode($this->code, $this->currentTabSize, 2);
    parent::show();
  }

  public function code(string $code)
  {
    $this->code = $code;
    return $this;
  }

  private function formatSpecialCharacters(string &$code)
  {
    $code = str_replace("<", "&lt;", $code);
    $code = str_replace(">", "&gt;", $code);
    $code = str_replace("\\n", "
 ", $code);
  }

  // outdent every line so that the first line reaches top left
  private function outdentCodeBlock(string &$code, int $outdent, int $currentTabSize)
  {
    $spacesToTrim = str_repeat(' ', $currentTabSize * $outdent);
    $code = str_replace($spacesToTrim, '', $code);
  }

  private function changeTabSizeInCode(string &$code, int $currentTabSize, int $newTabSize)
  {
    $currentSpacesPerTab = str_repeat(' ', $currentTabSize);
    $newSpacesPerTab = str_repeat(' ', $newTabSize);
    $code = str_replace($currentSpacesPerTab, $newSpacesPerTab, $code);
  }
}
