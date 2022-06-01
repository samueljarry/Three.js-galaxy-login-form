<!doctype html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="https://use.typekit.net/hen3esu.css">
    <title>Galaxie</title>
    <script defer="defer" src="bundle.9cb9bce61c50bea6.js"></script>
    <link href="main.css" rel="stylesheet">

</head>

<body><a href="test.php"></a>
    <section id="formulaire">
        <form action="connexion.php" method="post">
            <p>Pas encore inscrit ? <span id="inscription">Inscription</span></p>
            <input for="compte" name="nom" placeholder="Nom" autocomplete="off" required> 
            <input for="compte" name="prenom" placeholder="Prénom" autocomplete="off" required> 
            <input for="compte" name="mdp" type="password" placeholder="Mot de passe" autocomplete="off" required> 
            <input type="submit" name="submit" id="send" value="Connexion">
        </form>
    </section>
    <section id="formulaire2">
        <form action="inscription.php" method="post">
            <p id="fermer">Fermer</p>
            <input for="sign" name="nom" placeholder="Nom" autocomplete="off" required> 
            <input for="sign" name="prenom" placeholder="Prénom" autocomplete="off" required> 
            <input for="sign" name="mdp" type="password" placeholder="Mot de passe" autocomplete="off" required> 
            <select for="sign" name="tp" type="select" autocomplete="off" required>
            <option value="">Groupe de TP</option>
            <?php
                    require 'lib.php';
                    $co=connexionBD();
                    listeTP($co);
                    deconnexionBD($co);
               ?>
            </select> <input type="submit" name="submit" id="send1" value="Inscription">
        </form>
    </section><canvas class="webgl"></canvas>
</body>
<?php 
    var_dump($_SESSION)
?>
</html>