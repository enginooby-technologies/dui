        <?php include "php/forms/_index.php"; ?>

        <div class="display-table">
                <div class="display-content">
                        <div class="container">
                                <h5>Forms</h5>
                                <?php
                                RangeSlider('A cool slider', 'slider1', 1, 100, 1, 69);
                                ?>
                                <br><br>
                                <div class="radio-group">
                                        <?php
                                        Radio('radio1', 1, 'Cat');
                                        Radio('radio2', 2, 'Dog');
                                        ?>
                                </div>
                        </div>
                </div>
        </div>