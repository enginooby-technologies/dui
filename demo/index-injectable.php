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
                                        ->Button(label: "Dynamic button", id: "btn1")
                                        ->show();
                                CodeBlock(language: 'php', outdent: 5, wrapperClass: 'mt-3')
                                        ->code('Button(label: "Dynamic button",  id: "btn1") -> show();')
                                        ->show();
                                CodeBlock(language: 'ts', outdent: 5, wrapperClass: 'mt-3')
                                        ->code('const btn1 = Button("btn1")
                                        btn1.onClick = event => alert(`Hi! I am ${btn1.label}`)')
                                        ->show();
                                ?>

                                <h5 class="my-4">II - Container Components</h5>

                                <h5 class="my-4">III - Content Components</h5>

                                <h5 class="my-4">IV - Form Components</h5>
                                <?php

                                CodeBlock('php', '/* optional params: string $id = "slider_".format($label), float $min = $value = 0, float $step = 0.1 */
                                echo RangeSlider(label: "Dynamic slider",  max: 100);
                                ', 4);

                                Flexbox()
                                        ->Input()
                                        ->show();
                                CodeBlock(language: 'php', outdent: 5, wrapperClass: 'mt-3')
                                        ->code('Input() -> show();')
                                        ->show();

                                Flexbox()
                                        ->Radio(label: "Radio 1", group: "Group 1")
                                        ->Radio(label: "Radio 2", group: "Group 1", checked: true)
                                        ->show();
                                CodeBlock(language: 'php', outdent: 5, wrapperClass: 'mt-3')
                                        ->code('Radio(label: "Radio 1", group: "Group 1") -> show();
                                        Radio(label: "Radio 2", group: "Group 1", checked: true) -> show();')
                                        ->show();

                                Flexbox()
                                        ->Toggle(label: "Dynamic toggle")
                                        ->show();
                                CodeBlock(language: 'php', outdent: 5, wrapperClass: 'mt-3')
                                        ->code('Toggle(label: "Dynamic toggle") -> show();')
                                        ->show();

                                Flexbox()
                                        ->Checkbox(label: "Dynamic checkbox")
                                        ->show();
                                CodeBlock(language: 'php', outdent: 5, wrapperClass: 'mt-3')
                                        ->code('Checkbox(label: "Dynamic checkbox") -> show();')
                                        ->show();

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