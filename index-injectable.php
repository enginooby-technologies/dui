        <?php include_once "components/container/_index.php"; ?>
        <?php include_once "components/form/_index.php"; ?>
        <?php include_once "layouts/_index.php"; ?>

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

                                Flexbox(
                                        RangeSlider(label: "Dynamic slider",  max: 100)
                                );
                                CodeBlock('php', '// optional params: string $id = format($label), float $min = $value = 0, float $step = 0.1
                                echo RangeSlider(label: "Dynamic slider",  max: 100);
                                ', 4);

                                Flexbox(
                                        Radio(label: "Radio 1", value: 1, group: "group-1") .
                                                Radio(label: "Radio 2", value: 2, group: "group-1"),
                                );
                                CodeBlock('php', '// optional params: string $id = format($label)                                
                                        echo Radio(label: "Radio 1", value: 1, group: "group-1");
                                        echo Radio(label: "Radio 2", value: 2, group: "group-1");
                                        ', 5);

                                Flexbox(
                                        Toggle(label: "Dynamic toggle")
                                );
                                CodeBlock('php', '// optional params: string $id = $name = format($label), float $value = 0
                                echo Toggle(label: "Dynamic toggle");
                                ', 4);

                                Flexbox(
                                        Checkbox(name: "Dynamic checkbox")
                                );
                                CodeBlock('php', '// optional params: string $id = $value = format($name)
                                echo Checkbox(name:"Dynamic checkbox");
                                ', 4);
                                ?>

                                <h5 class="my-4">V - Navigation Components</h5>
                                <?= CodeBlock('php', '<?= include_once "components/navigation/_index.php";?>') ?>

                                <h5 class="my-4">VI - Advanced Components</h5>
                                <?= CodeBlock('php', '<?= include_once "components/advanced/_index.php";?>') ?>
                        </div>
                </div>
        </div>