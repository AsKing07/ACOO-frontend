<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TEMPLATE</title>
    <style>
        .section
        {
            justify-content: center;
            align-items: center;

            /* Ligne de séparatiion en bas */
            border-bottom: 1px solid black;
            margin-bottom: 20px;
            padding-bottom: 20px;
            
        }
    </style>
    <link rel="stylesheet"  href="styles.css">
</head>
<body>
<?php require_once 'components/header.php'; ?>

<?php require_once 'components/grille.php'; ?>


<?php require_once 'components/buttons.php'; ?>

<?php require_once 'components/events_card.php'; ?>

<?php require_once 'components/champion_card.php'; ?>

<?php require_once 'components/footer.php'; ?>


    
</body>
</html>