<div id="setting-section" class="setting-section">
        <div class="text-center setting-panel hide">
                <div class="setting-panel-content">
                        <ul class="theme-skin mb-1 radio-button-group" id="ui-style-panel">
                                <h6 class="text-center mt-0 mb-3">UI Style</h6>
                                <!-- TODO: make buttons  equal widths -->
                                <div class="button-border">
                                        <a href="#" class="button" id="flat-skin-button">Flat</a>
                                </div>
                                <!-- <div class="button-border">
                                        <a href="#" class="button" id="nes-skin-button">NES</a>
                                </div> -->
                                <div class="button-border">
                                        <a href="#" class="button" id="neu-skin-button">Neumorphism</a>
                                </div>
                                <div class="button-border">
                                        <a href="#" class="button" id="glass-skin-button">Glassmorphism</a>
                                </div>
                        </ul>

                        <div class="scrollable ">
                                <!-- STYLE CUSTOMIZER -->
                                <div id="customizer-panel">
                                        <div class="customizer" id="neu-customizer">
                                                <h6 class="text-center mt-0">Neu Customizer</h6>
                                                <?php
                                                rangeSlider('Distance X', 'neu-distance-x', 0, 20);
                                                rangeSlider('Distance Y', 'neu-distance-y', 0, 20);
                                                rangeSlider('Blur', 'blur', 0, 20);
                                                rangeSlider('Spread', 'neu-spread', -5, 5);
                                                rangeSlider('Light intensity', 'light-intensity', 1, 20);
                                                rangeSlider('Dark intensity', 'dark-intensity', 1, 20);
                                                rangeSlider('Surface curvature', 'surface-curvature', -20, 20);
                                                ?>
                                                <div id="neu-border-style-options">
                                                        <p class="radio-title">Border style</p>
                                                        <div class="radio-group">
                                                                <?php
                                                                radioButton('solid-border', 0);
                                                                radioButton('double-border', 1);
                                                                radioButton('dotted-border', 2);
                                                                radioButton('dashed-border', 3);
                                                                ?>
                                                        </div>
                                                </div>
                                                <?php
                                                rangeSlider('Border width', 'neu-border-width', 0, 10);
                                                rangeSlider('Border brightness', 'neu-border-brightness', -100, 100);
                                                ?>
                                        </div>
                                        <div class="customizer" id="flat-customizer-in-progress">
                                                <h6 class="text-center mt-0"> Flat Customizer</h6>
                                        </div>
                                        <div class="customizer" id="glass-customizer">
                                                <h6 class="text-center mt-0"> Glass Customizer</h6>
                                                <?php
                                                rangeSlider('Transparency', 'glass-transparency', 0, 1);
                                                rangeSlider('Blur', 'glass-blur', 0, 30);
                                                rangeSlider('Border size', 'glass-border-size', 0, 10);
                                                ?>
                                                <div class="background-gallery">
                                                        <p>Background</p>
                                                        <div class="row px-4">
                                                                <div class="col-4 background-item " id="background-1"> </div>
                                                                <div class="col-4 background-item " id="background-2"> </div>
                                                                <div class="col-4 background-item " id="background-3"> </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <!-- GLOBAL CUSTOMIZER -->
                                <div id="color-panel">
                                        <h6 class="text-center mt-3"> Colour</h6>
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
                                        <div class="row mt-3 px-4 justify-content-center">
                                                <label>Classification</label>
                                        </div>
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

                                <div id="border-panel" class="mt-3 mb-3">
                                        <h6 class="text-center "> Border</h6>
                                        <?php
                                        rangeSlider('Radius', 'border-radius', 0, 50);
                                        ?>
                                </div>
                        </div>

                        <div class="setting-save-panel">
                                <label class="label">
                                        <div class="toggle">
                                                <input class="toggle-state" type="checkbox" name="check" value="check" />
                                                <div class="indicator"></div>
                                        </div>
                                        <div class="label-text">Save</div>
                                        <!-- TODO: Random button-->
                                </label>
                        </div>
                </div>
        </div>
        <div class="setting-button-border hide animate__animated animate__backInLeft">
                <div class="setting-button ">
                        <a href="#" class="cp-toggle"><i class="fa fa-cog fa-spin" aria-label="Toggle setting button"></i></a>
                </div>
        </div>
</div>

<?php
function rangeSlider($label, $id, $min, $max, $step = 0.1)
{
        echo "
        <div class='range-slider'>
                <label for='$id'>$label</label>
                <input class='range-slider__range' id='$id' type='range' min='$min' max='$max' step='$step'>
                <span class='range-slider__value'></span>
        </div>
        ";
}

function radioButton($id, $value)
{
        echo "
        <div class='radio-button-wrapper'>
                <input class='state' type='radio' name='app' id='$id' value='$value'>
                <label class='label' for='$id'>
                        <div class='indicator'></div>
                        <span class='text'></span>
                </label>
        </div>
        ";
}
?>