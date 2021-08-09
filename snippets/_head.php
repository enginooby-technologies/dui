<!doctype html>
<html lang="en">

<head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">
        <title><?= $title ?></title>

        <link rel="stylesheet" href="dui/css/dynamic-style.css" type="text/css">
        <?php foreach ($cssHref as $href) : ?>
                <link rel="stylesheet" href="<?= $href ?>" type="text/css">
        <?php endforeach; ?>
</head>