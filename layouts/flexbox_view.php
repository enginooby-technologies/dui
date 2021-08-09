<div class="<?= $class ?> d-flex justify-content-<?= $justifyContent ?> flex-<?= $direction ?>">
        <?php foreach ($components as $component) : ?>
                <?php $component->show(); ?>
        <?php endforeach; ?>
</div>