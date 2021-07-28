        <?php include_once "components/form/_index.php"; ?>

        <div class="display-table">
                <div class="display-content">
                        <div class="container">
                                <h3 class="text-center p-3">Dynamic UI Framework</h3>
                                <hr><br><br>
                                <h5>Form</h5>
                                <?php
                                RangeSlider(label: 'A cool slider', id: 'slider1', min: 1, max: 100, value: 69);
                                RangeSlider(label: 'Another cool slider', id: 'slider2', min: 1, max: 100, value: 96);
                                RangeSlider(label: 'Another cool slider 2', id: 'slider4', min: 4, max: 5, value: 1);
                                ?>
                                <br><br>
                                <div class="radio-group">
                                        <?php
                                        Radio(id: 'radio1', value: 1, label: 'Cat');
                                        Radio(id: 'radio2', value: 2, label: 'Dog');
                                        ?>
                                </div>
                        </div>
                </div>
        </div>