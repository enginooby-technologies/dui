<?php
// invoke ob_start() & and include php file first
function getHtmlOutputFromBuffer(): string
{
  $output = ob_get_contents();
  ob_end_clean();
  return $output;
}
