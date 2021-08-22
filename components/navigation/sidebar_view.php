<nav class="sidebar <?= $class ?> <?= $wrapperClass ?>">
  <ul class="side-nav">
    <?php foreach ($components as $item) : ?>
      <li class='side-nav__item <?php echo $item->isActive ? "side-nav__item--active" : "" ?>'>
        <a href='<?= $item->href ?>' class='side-nav__link'>
          <svg class='side-nav__icon'>
            <use href='<?= $item->icon ?>'></use>
          </svg>
          <span class='side-nav__link'><?= $item->label ?></span>
        </a>
      </li>
    <?php endforeach; ?>
  </ul>
  <div class="legal">&copy;2021 by enginoobz. All rights reserved.</div>
</nav>