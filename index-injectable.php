        <?php include "php/forms/_index.php"; ?>

        <h3 class="text-center p-3">Dynamic UI Framework</h3>
        <hr>
        <div class="display-table">
                <div class="display-content">
                        <div class="container">
                                <h5>Form</h5>
                                <?php
                                RangeSlider(label: 'A cool slider', id: 'slider1', min: 1, max: 100, value: 69);
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