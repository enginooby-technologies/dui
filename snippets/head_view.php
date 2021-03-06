<head>
  <title><?= $title ?></title>

  <!-- META -->
  <meta charset="<?= $charset ?>">
  <meta name="viewport" content="<?= $viewport ?>">
  <?php if ($author) : ?>
    <meta name="author" content="<?= $author ?>">
  <?php endif; ?>
  <?php if ($description) : ?>
    <meta name="description" content="<?= $description ?>">
  <?php endif; ?>
  <?php if ($keywords) : ?>
    <meta name="keywords" content="<?= $keywords ?>">
  <?php endif; ?>
  <?php if ($revised) : ?>
    <meta name="revised" content="<?= $revised ?>">
  <?php endif; ?>
  <?php if ($refresh) : ?>
    <meta http-equiv="refresh" content="<?= $refresh ?>" />
  <?php endif; ?>
  <?php if ($redirect) : ?>
    <meta http-equiv="refresh" content="<?= $redirectDelay ?>; url=<?= $redirect ?>" />
  <?php endif; ?>
  <?php if ($cookie) : ?>
    <meta http-equiv="cookie" content="<?= $cookie ?>" />
  <?php endif; ?>

  <!-- FONT PRELOAD -->

  <!-- CSS -->
  <!-- TODO: Use CDN for DUI css -->
  <link rel="stylesheet" href="/dui/css/dynamic-style.css" type="text/css">
  <!-- TODO: Verify if sheets are in order -->
  <?php foreach ($cssHrefs as $href) : ?>
    <link rel="stylesheet" href="<?= $href ?>" type="text/css">
  <?php endforeach; ?>
  <style>
    :root {
      <?php if ($schemeColor) : ?>--dui-scheme: <?= $schemeColor ?>;
      <?php endif; ?><?php if ($primaryColor) : ?>--dui-primary: <?= $primaryColor ?> <?php endif; ?>
    }
  </style>
</head>