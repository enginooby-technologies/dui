<!DOCTYPE html>
<html lang="en">

<?php include_once __DIR__ . "/../_index.php";
Head(title: "DUI")
        ->meta(
                author: "enginoobz",
                description: "Demo page for Dynamic UI Framework",
                keywords: "ui, dynamic, bootstrap, framework, jquery, php, flat, nes, pixel, windows, neumorphism, glassmorphism",
        )
        ->init(
                highlightColor: '#eb4034'
        )
        ->show();
?>
<!-- <head>
        <link rel="preload" href="../fonts/agency-fb-regular/AgencyFB-Reg.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="../fonts/agency-fb-bold/AgencyFB-Bold.woff2" as="font" type="font/woff2" crossorigin>
</head> -->

<body class="neu-style ">
        <!-- TODO: Add preloader to hide FOUC + Use a few indentical CSS as loading style sheet (e.g. Bootstrap) to reduce FOUC-->
        <?php include_once "index-injectable.php"; ?>

        <script src="./index.js" type="module"></script>
        <script async src="../js/main.js" type="module"></script>
</body>

</html>