# Doucement — version fusionnée finale

Cette archive rassemble l’organiseur principal et les modules complémentaires.

## Installation GitHub Pages
1. Décompressez cette archive.
2. Téléversez **tout le contenu** à la racine du dépôt, au même niveau que `index.html`.
3. Remplacez les fichiers existants portant le même nom.
4. Dans Settings → Pages, sélectionnez `main` et `/ (root)`, puis enregistrez.
5. Après publication, actualisez le site avec Ctrl+Maj+R.

## Pages
- `index.html` : accueil de l’organiseur principal
- `projet.html` : création/modification de projet et tâches (rendu par `app.js`)
- `planning.html` : calendrier et planning (rendu par `app.js`)
- `historique.html` : historique (rendu par `app.js`)
- `voyages.html` : recherche de lieux, étapes, mode Plan, mode Satellite + noms et calcul de trajet routier
- `souvenirs.html`, `idees.html`, `journee.html`, `budget.html`, `messages.html`, `stats.html` : modules complémentaires

## Corrections de cette version
- Identité typographique unifiée et palette ajustée, sans changer la structure générale du thème.
- Mode sombre cohérent sur les pages des modules et champs de recherche lisibles.
- Chargement différé de Leaflet corrigé pour initialiser la carte dans le bon ordre.
- Curseur interactif pour ajuster le budget et animations discrètes sur les cartes et les blocs du planning.

## Carte et limites
La carte utilise Leaflet, les tuiles OpenStreetMap pour le plan, Esri World Imagery pour le satellite et une couche de libellés CARTO pour les noms de lieux. La recherche utilise le service public Nominatim et le calcul routier le service OSRM. Une connexion Internet est nécessaire et ces services publics peuvent avoir des limites de disponibilité ou d’usage. Le mode satellite avec noms est inclus ; **le vrai rendu 3D inclinable avec bâtiments en volume n’est pas inclus** dans cette version.

## Données
Les données sont stockées localement dans le navigateur (`localStorage`). Cette version n’inclut pas encore une base de données distante ni la synchronisation multi-appareils. Ne remplacez pas vos anciens fichiers avant d’avoir fait une copie de sauvegarde du dépôt.
