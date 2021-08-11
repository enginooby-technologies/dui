        <?php include_once "../_index.php"; ?>

        <div class="display-table">
                <div class="display-content ">
                        <div class="container ">
                                <h2 class="text-center p-3 highlight-color">Dynamic UI Framework</h2>
                                <hr><br>
                                <?php CodeBlock(language: 'php', code: '<?= include_once "dui/_index.php";?>')->show(); ?>

                                <h5 class="my-4">I - Basic Components</h5>
                                <?php
                                Flexbox()
                                        ->add(Button(label: "Dynamic button"))
                                        ->show();
                                CodeBlock(language: 'php', outdent: 5, wrapperClass: 'mt-3')
                                        ->code('Button(label: "Dynamic button")->show();')
                                        ->show();

                                Flexbox()
                                        ->add(Input())
                                        ->show();
                                ?>

                                <h5 class="my-4">II - Container Components</h5>

                                <h5 class="my-4">III - Content Components</h5>

                                <h5 class="my-4">IV - Form Components</h5>
                                <?php

                                CodeBlock('php', '/* optional params: string $id = "slider_".format($label), float $min = $value = 0, float $step = 0.1 */
                                echo RangeSlider(label: "Dynamic slider",  max: 100);
                                ', 4);

                                Flexbox(
                                        // null,
                                        // Radio(label: "Radio 1", value: 1, group: "group-1"),
                                        // Radio(label: "Radio 2", value: 2, group: "group-1", checked: true),
                                );
                                CodeBlock('php', '/* optional params: string $id = "radio_".format($label), bool $checked = false  */                              
                                        echo Radio(label: "Radio 1", value: 1, group: "group-1");
                                        echo Radio(label: "Radio 2", value: 2, group: "group-1", checked: true);
                                        ', 5);

                                Flexbox(
                                        // null,
                                        // Toggle(label: "Dynamic toggle")
                                );
                                CodeBlock('php', '/* optional params: string $id = $name = "toggle_".format($label), float $value = 0 */
                                echo Toggle(label: "Dynamic toggle");
                                ', 4);

                                Flexbox()
                                        ->add(Checkbox(label: "Dynamic checkbox"))
                                        ->show();
                                CodeBlock('php', '/* optional params: string $id = $value = "checkbox_".format($name), bool $checked = false  */
                                echo Checkbox(name:"Dynamic checkbox");
                                ', 4);

                                Flexbox(
                                        null,
                                        // Dropdown(
                                        //         "Dynamic dropdown",
                                        //         "dropdown-demo",
                                        //         ["label" => "Option 1", "value" => 1],
                                        //         ["label" => "Option 2", "value" => 2],
                                        //         ["label" => "Option 3", "value" => 3],
                                        // )
                                );
                                CodeBlock('php', '/* optional dropdown item keys: "href" => "javascript:;", "value" = 0 */
                                        echo Dropdown(
                                                "Dynamic dropdown",
                                                "dropdown-demo",
                                                ["label" => "Option 1", "value" => 1],
                                                ["label" => "Option 2", "value" => 2],
                                                ["label" => "Option 3", "value" => 3],
                                        )', 5);
                                ?>

                                <h5 class="my-4">V - Navigation Components</h5>

                                <h5 class="my-4">VI - Advanced Components</h5>
                        </div>
                </div>
        </div>