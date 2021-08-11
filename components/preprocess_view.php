<?php
/* 
        Process object properties before passing to the view file
*/

// COMMON 
$id = $this->id ?? '';
$idAttr = $this->id ? "id='$this->id'" : '';
$class = $this->class;
$classAttr = $this->class ? "id='$this->class'" : '';
$wrapperClass = $this->wrapperClass;
$onclickAttr = $this->onclick ? "onclick='$this->onclick'" : '';

// BUTTON
if (property_exists($this, 'label'))
        $label = $this->label;
if (property_exists($this, 'href'))
        $href = $this->href;

// INPUT
if (property_exists($this, 'name'))
        $nameAttr = $this->name ? "name='$this->name'" : '';
if (property_exists($this, 'placeholder'))
        $placeholderAttr = $this->placeholder ? "placeholder='$this->placeholder'" : '';
if (property_exists($this, 'required'))
        $requiredAttr = $this->required ? 'required' : '';

//CODE BLOCK
if (property_exists($this, 'code'))
        $code = $this->code;
if (property_exists($this, 'language'))
        $language = $this->language;

// CHECKBOX
if (property_exists($this, 'value'))
        $value = $this->value;
if (property_exists($this, 'checked'))
        $checkedAttr = $this->checked ? 'checked' : '';
