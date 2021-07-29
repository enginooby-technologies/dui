        <?php include_once "components/container/_index.php"; ?>
        <?php include_once "components/form/_index.php"; ?>

        <div class="display-table">
                <div class="display-content">
                        <div class="container ">
                                <h2 class="text-center p-3 highlight-color">Dynamic UI Framework</h2>
                                <hr>

                                <h5 class="my-4">I - Basic Components</h5>
                                <?= CodeBlock('php', '<?= include_once "components/basic/_index.php";?>') ?>

                                <h5 class="my-4">II - Container Components</h5>
                                <?= CodeBlock('php', '<?= include_once "components/container/_index.php";?>') ?>

                                <h5 class="my-4">III - Content Components</h5>
                                <?= CodeBlock('php', '<?= include_once "components/content/_index.php";?>') ?>

                                <h5 class="my-4">IV - Form Components</h5>
                                <?= CodeBlock('php', '<?= include_once "components/form/_index.php";?>') ?>
                                <?= RangeSlider(label: 'Slider label', id: 'slider1', min: 1, max: 100, value: 69); ?>
                                <?= CodeBlock('php', '<?= RangeSlider(string $id, string $label, float $min = 0, float $max, float $step = 0.1, float $value = null); ?>') ?>

                                <div class='radio-group'>
                                        <?=
                                        Radio(id: 'radio1-1', value: 1, label: 'Radio 1', groupName: 'group-1');
                                        Radio(id: 'radio1-2', value: 2, label: 'Radio 2', groupName: 'group-1');
                                        ?>
                                </div>
                                <!-- TODO: Strip first empty line in the code block -->
                                <?= CodeBlock('php', "                                
                                <div class='radio-group'>
                                        <?=
                                        Radio(id: 'radio1', value: 1, label: 'Radio 1');
                                        Radio(id: 'radio2', value: 2, label: 'Radio 2');
                                        ?>
                                </div>
                                ", 4); ?>

                                <?=
                                RadioGroup(
                                        new Radio('radio3', 'Radio 1', '1', 'group-2'),
                                        new Radio('radio4', 'Radio 2', '2', 'group-2')
                                )
                                ?>
                                <?= CodeBlock('php', "                                
                                <?=
                                RadioGroup(
                                        new Radio('radio3', 'Radio 1', '1', 'group-2'),
                                        new Radio('radio4', 'Radio 2', '2', 'group-2')
                                )
                                ?>
                                ", 4); ?>

                                <h5 class="my-4">V - Navigation Components</h5>
                                <?= CodeBlock('php', '<?= include_once "components/navigation/_index.php";?>') ?>

                                <h5 class="my-4">VI - Advanced Components</h5>
                                <?= CodeBlock('php', '<?= include_once "components/advanced/_index.php";?>') ?>
                        </div>
                </div>
        </div>