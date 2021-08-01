<div class="dropdown" id="<?= $id ?>">
        <button type="button" class="dropdown-label"><?= $label ?></button>
        <button type="button" class=" btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="fas fa-angle-down dropdown-arrow"></span>
                <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
                <?php foreach ($items as $item) : ?>
                        <a class="dropdown-item" href="<?= $item["href"] ?? "javascript:;" ?>" value="<?= $item["value"] ?? 0 ?>"><?= $item["label"] ?></a>
                <?php endforeach; ?>
                <!-- <div class="dropdown-divider"></div> -->
                <!-- <a class="dropdown-item" href="#">Separated link</a> -->
        </div>
</div>