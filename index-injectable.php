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
                                <?= CodeBlock('php', '<?= include_once "components/form/_index.php";?>');
                                RangeSlider(label: 'Slider', id: 'slider1', min: 1, max: 100, value: 69);
                                CodeBlock('php', 'RangeSlider(string $id, string $label, float $min = 0, float $max, float $step = 0.1, float $value = null); ');

                                Radio(label: 'Radio 1', id: 'radio-1', value: 1, group: 'group-1');
                                Radio(label: 'Radio 2', id: 'radio-2', value: 2, group: 'group-1');
                                //  TODO: Strip first empty line in the code block 
                                CodeBlock('php', "//                              
                                Radio(label: 'Radio 1', id: 'radio-1', value: 1, group: 'group-1');
                                Radio(label: 'Radio 2', id: 'radio-2', value: 2, group: 'group-1');
                                ", 4);

                                Toggle('Toggle', 'demo-toggle');
                                CodeBlock('php', 'Toggle(string $label, string $id, string $name = null, string $value = "");');
                                ?>

                                <h5 class="my-4">V - Navigation Components</h5>
                                <?= CodeBlock('php', '<?= include_once "components/navigation/_index.php";?>') ?>

                                <h5 class="my-4">VI - Advanced Components</h5>
                                <?= CodeBlock('php', '<?= include_once "components/advanced/_index.php";?>') ?>
                        </div>
                </div>
        </div>