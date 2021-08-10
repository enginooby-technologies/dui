<?php
/* 
        Process object properties before passing to the view file
*/

// COMMON 
$idAttr = $this->id ? "id='$this->id'" : '';
$class = $this->class;
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
if (property_exists($this, 'isRequired'))
        $requiredAttr = $this->isRequired ? 'required' : '';
