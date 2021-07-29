<div class='radio-group'>
        <?php foreach ($Radioes as $Radio) : ?>
                <div class='radio-button-wrapper'>
                        <input class='state' type='radio' name='<?= $Radio->groupName ?>' id='<?= $Radio->id ?>' value='<?= $Radio->value ?>'>
                        <label class='label' for='<?= $Radio->id ?>'>
                                <div class='indicator'></div>
                                <span class='text'><?= $Radio->label ?></span>
                        </label>
                </div>
        <?php endforeach; ?>
</div>