<?php

declare(strict_types=1);

// @param $currentTabSize: number of spaces per tab configured in the editor
function CodeBlock(string $language, string $code = '', int $outdent = 0,  int $currentTabSize = 8, string $wrapperClass = ''): CodeBlock
{
        return new CodeBlock($code, $language, $outdent, $currentTabSize, $wrapperClass);
}

class CodeBlock
{
        public function __construct(
                private string $code,
                private string $language,
                private int $outdent = 0,
                private $currentTabSize = 8,
                private $wrapperClass = '',
        ) {
        }

        public function show()
        {
                $code = $this->code;
                $language = $this->language;
                $wrapperClass = $this->wrapperClass;
                $this->formatSpecialCharacters($code);
                $this->outdentCodeBlock($code, $this->outdent, $this->currentTabSize);
                $this->changeTabSizeInCode($code, $this->currentTabSize, 2);
                include "code_block_view.php";
                return $this;
        }

        public function wrapperClass(string $name)
        {
                $this->wrapperClass .= (' ' . $name);
                return $this;
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
