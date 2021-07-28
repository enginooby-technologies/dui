<?php
include_once "../components/form/_index.php";
include_once "../components/basic/_index.php";
?>

<div id="setting-section" class="setting-section">
        <div class="text-center setting-panel hide">
                <div class="setting-panel-content">
                        <ul class="theme-skin mb-1 radio-button-group" id="ui-style-panel">
                                <h6 class="text-center mt-0 mb-3">UI Style</h6>
                                <!-- TODO: make buttons  equal widths -->
                                <?php
                                Button(label: 'Flat', id: 'flat-skin-button');
                                Button(label: 'Neumorphism', id: 'neu-skin-button');
                                Button(label: 'Glassmorphism', id: 'glass-skin-button');
                                ?>
                        </ul>

                        <div class="scrollable ">
                                <!-- STYLE CUSTOMIZER -->
                                <div id="customizer-panel">
                                        <div class="customizer" id="neu-customizer">
                                                <h6 class="text-center mt-0">Neu Customizer</h6>
                                                <?php
                                                RangeSlider(label: 'Distance X', id: 'neu-distance-x',  max: 20);
                                                RangeSlider(label: 'Distance Y', id: 'neu-distance-y', max: 20);
                                                RangeSlider(label: 'Blur', id: 'blur', max: 20);
                                                RangeSlider(label: 'Spread', id: 'neu-spread', min: -5, max: 5);
                                                RangeSlider(label: 'Light intensity', id: 'light-intensity', max: 20);
                                                RangeSlider(label: 'Dark intensity', id: 'dark-intensity', max: 20);
                                                RangeSlider(label: 'Surface curvature', id: 'surface-curvature', min: -20, max: 20);
                                                ?>
                                                <div id="neu-border-style-options">
                                                        <p class="radio-title">Border style</p>
                                                        <div class="radio-group">
                                                                <?php
                                                                Radio(id: 'solid-border', value: 0);
                                                                Radio(id: 'double-border', value: 1);
                                                                Radio(id: 'dotted-border', value: 2);
                                                                Radio(id: 'dashed-border', value: 3);
                                                                ?>
                                                        </div>
                                                </div>
                                                <?php
                                                RangeSlider(label: 'Border width', id: 'neu-border-width',  max: 10);
                                                RangeSlider(label: 'Border brightness', id: 'neu-border-brightness', min: -100, max: 100);
                                                ?>
                                        </div>
                                        <div class="customizer" id="flat-customizer-in-progress">
                                                <h6 class="text-center mt-0"> Flat Customizer</h6>
                                        </div>
                                        <div class="customizer" id="glass-customizer">
                                                <h6 class="text-center mt-0"> Glass Customizer</h6>
                                                <?php
                                                RangeSlider(label: 'Transparency', id: 'glass-transparency',  max: 1);
                                                RangeSlider(label: 'Blur', id: 'glass-blur', max: 30);
                                                RangeSlider(label: 'Border size', id: 'glass-border-size', max: 10);
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
                                        RangeSlider(label: 'Radius', id: 'border-radius', max: 50);
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
                        <a href="javascript:;" class="cp-toggle"><i class="fa fa-cog fa-spin" aria-label="Toggle setting button"></i></a>
                </div>
        </div>
</div>