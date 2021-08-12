<?php
include_once "_index.php";
?>

<div id="setting-section" class="setting-section">
        <div class="text-center setting-panel hide">
                <?php
                TitleBar("Setting")->show();
                ?>
                <div class="setting-panel-content">
                        <ul class="theme-skin mb-1 radio-button-group" id="ui-style-panel">
                                <p class="option-label">UI Style</p>
                                <!-- TODO: make buttons  equal widths -->
                                <?php
                                echo Dropdown(
                                        "Select style",
                                        "dropdown-ui-style",
                                        // match with style class name
                                        ["label" => "Flat", "value" => "flat-style"],
                                        ["label" => "NES - Pixel", "value" => "nes-style"],
                                        ["label" => "Windows 98", "value" => "win98-style"],
                                        ["label" => "Windows XP", "value" => "winxp-style"],
                                        ["label" => "Neumorphism", "value" => "neu-style"],
                                        ["label" => "Glassmorphism", "value" => "glass-style"],
                                );
                                ?>
                        </ul>

                        <div class="scrollable ">
                                <!-- STYLE CUSTOMIZER -->
                                <div id="customizer-panel">
                                        <div class="customizer  option-panel mb-3" id="neu-customizer">
                                                <p class="option-label">Neu Custom</p>
                                                <?php
                                                // NOTICE: echo can only used in "<?php", not "<=?"
                                                echo RangeSlider(label: 'Distance X', id: 'neu-distance-x',  max: 20);
                                                echo  RangeSlider(label: 'Distance Y', id: 'neu-distance-y', max: 20);
                                                echo RangeSlider(label: 'Blur', id: 'blur', max: 20);
                                                echo RangeSlider(label: 'Spread', id: 'neu-spread', min: -5, max: 5);
                                                echo RangeSlider(label: 'Light intensity', id: 'light-intensity', max: 20);
                                                echo RangeSlider(label: 'Dark intensity', id: 'dark-intensity', max: 20);
                                                echo RangeSlider(label: 'Surface curvature', id: 'surface-curvature', min: -20, max: 20);
                                                ?>

                                                <p>Border style</p>
                                                <div class="radio-group-wrapper">
                                                        <?php
                                                        echo Radio(id: 'solid-border', value: 0, group: 'neu-border-style', label: '');
                                                        echo Radio(id: 'double-border', value: 1, group: 'neu-border-style', label: '');
                                                        echo Radio(id: 'dotted-border', value: 2, group: 'neu-border-style', label: '');
                                                        echo Radio(id: 'dashed-border', value: 3, group: 'neu-border-style', label: '');
                                                        ?>
                                                </div>
                                                <?php
                                                echo RangeSlider(label: 'Border width', id: 'neu-border-width',  max: 10);
                                                echo RangeSlider(label: 'Border brightness', id: 'neu-border-brightness', min: -100, max: 100);
                                                ?>
                                        </div>
                                        <div class="customizer" id="flat-customizer-in-progress">
                                                <p class="option-label">Flat Custom</p>
                                        </div>
                                        <div class="customizer" id="glass-customizer">
                                                <p class="option-label">Glass Custom</p>
                                                <?php
                                                echo RangeSlider(label: 'Transparency', id: 'glass-transparency',  max: 1);
                                                echo RangeSlider(label: 'Blur', id: 'glass-blur', max: 30);
                                                echo RangeSlider(label: 'Border size', id: 'glass-border-size', max: 10);
                                                ?>
                                        </div>
                                </div>
                                <!-- GLOBAL CUSTOMIZER -->
                                <div id="color-panel" class="option-panel mb-3">
                                        <p class="option-label">Colour</p>
                                        <div class="row px-4">
                                                <div class="col-6 p-0">
                                                        <label for="highlight-color-picker">Highlight</label>
                                                        <input type="color" id="highlight-color-picker" value="#0000ff">
                                                </div>
                                                <div class="col-6 p-0">
                                                        <label for="scheme-color-picker">Scheme</label>
                                                        <input type="color" id="scheme-color-picker" value="#f1f3f6">
                                                </div>
                                        </div>
                                        <p>Classification</p>
                                        <div class="row mt-1 px-4">
                                                <div class="col-4 p-0 ">
                                                        <input class="color-picker" type="color" id="colorfull1-picker" value="#01724b">
                                                </div>
                                                <div class="col-4 p-0 ">
                                                        <input class="color-picker" type="color" id="colorfull2-picker" value="#b44700">
                                                </div>
                                                <div class="col-4 p-0">
                                                        <input class="color-picker" type="color" id="colorfull3-picker" value="#c40639">
                                                </div>
                                        </div>
                                </div>

                                <!-- BORDER -->
                                <div id="border-panel" class="option-panel mb-3">
                                        <p class="option-label">Border</p>
                                        <?php
                                        echo RangeSlider(label: 'Radius', id: 'border-radius', max: 50);
                                        ?>
                                </div>

                                <!-- FONT -->
                                <div id="font-panel" class="option-panel mb-4">
                                        <p class="option-label">Text</p>
                                        <div id="font-family-panel">
                                                <p class="mb-0">Font</p>
                                                <?php
                                                echo Dropdown(
                                                        "Agency FB",
                                                        "dropdown-font-family",
                                                        ["label" => "Agency FB"],
                                                        ["label" => "Style Script"],
                                                        ["label" => "Ubuntu"],
                                                        ["label" => "BioRhyme"],
                                                        ["label" => "Roboto"],
                                                        ["label" => "Special Elite"],
                                                        ["label" => "Press Start 2P"],
                                                );
                                                echo RangeSlider(label: "Size scale", min: 0.5, max: 1.4, step: 0.01);
                                                echo RangeSlider(label: "Line height", min: 1, max: 2, step: 0.05);
                                                echo RangeSlider(label: "Letter spacing", min: -10, max: 20);
                                                ?>
                                        </div>
                                </div>

                                <!-- BACKGROUND -->
                                <div id="background-panel" class="option-panel mb-4">
                                        <p class="option-label">Background</p>
                                        <div id="outer-background-panel">
                                                <p> Page </p>
                                                <?php
                                                echo Dropdown(
                                                        "None",
                                                        "dropdown-outer-bg",
                                                        ["label" => "None"],
                                                        ["label" => "Liquid cheese"],
                                                        ["label" => "Protruding squares"],
                                                        ["label" => "Wintery sunburst"],
                                                        ["label" => "Animated gradient"],
                                                        ["label" => "Linear gradient"],
                                                        ["label" => "Vanishing stripes"],
                                                        ["label" => "Windows98"],
                                                        ["label" => "WindowsXP"],
                                                )
                                                ?>
                                        </div>
                                        <div id="inner-background-panel" class="mt-3">
                                                <p> Containers </p>
                                                <?php
                                                echo Dropdown(
                                                        "None",
                                                        "dropdown-inner-bg",
                                                        ["label" => "None"],
                                                        ["label" => "Liquid cheese"],
                                                        ["label" => "Protruding squares"],
                                                        ["label" => "Wintery sunburst"],
                                                        ["label" => "Animated gradient"],
                                                        ["label" => "Linear gradient"],
                                                        ["label" => "Vanishing stripes"],
                                                        ["label" => "Windows98"],
                                                        ["label" => "WindowsXP"],
                                                )
                                                ?>
                                        </div>
                                </div>

                        </div>

                        <div class="setting-save-panel">
                                <?= Toggle('Save', 'setting-save-button') ?>
                                <!-- TODO: Random button-->
                        </div>
                </div>
        </div>
</div>