<div class="<?= $class ?> d-flex <?= $flexOption ?>">
  <?php foreach ($components as $component) : ?>
    <?php if (is_a($component, 'Component') || is_a($component, 'Container')) : ?>
      <?php $component->show(); ?>
    <?php endif; ?>
  <?php endforeach; ?>
</div>