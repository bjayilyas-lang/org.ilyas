# Doucement — version fusionnée finale

Cette archive rassemble l’organiseur principal et les modules complémentaires.

## Installation GitHub Pages
1. Décompressez cette archive.
2. Téléversez **tout le contenu** à la racine du dépôt, au même niveau que `index.html`.
3. Remplacez les fichiers existants portant le même nom.
4. Dans Settings → Pages, sélectionnez `main` et `/ (root)`, puis enregistrez.
5. Après publication, actualisez le site avec Ctrl+Maj+R.

## Pages
- `index.html` : coque du site (garde le lecteur Spotify actif quand tu changes de page) ; elle charge les autres pages
- `accueil.html` : accueil de l’organiseur principal
- `projet.html` : création/modification de projet et tâches (rendu par `app.js`)
- `planning.html` : calendrier et planning (rendu par `app.js`)
- `historique.html` : historique (rendu par `app.js`)
- `voyages.html` : recherche de lieux, étapes, mode Plan, mode Satellite + noms et calcul de trajet routier
- `souvenirs.html`, `idees.html`, `journee.html`, `budget.html`, `messages.html`, `stats.html` : modules complémentaires

## Corrections de cette version
- Une seule feuille de style (`style.css`) pour toutes les pages, avec le même menu latéral et la même barre du haut : plus d'incohérence entre les pages.
- Polices (DM Sans, Space Grotesk, monospace pour les étiquettes) et palette crème / orange / rose / jaune / violet reprises de bjayilyaspcp.vercel.app ; les polices sont dans `fonts/`.
- Mode sombre complet, y compris barre de recherche, carte et courbe du budget.
- Carte : Leaflet est maintenant inclus dans `vendor/leaflet/` (plus de dépendance à unpkg).
- Budget : barre interactive à faire glisser (boutons −100 / −25 / +25 / +100), la partie dépensée avance et recule en direct.
- Emploi du temps (accueil et planning) : barre de journée avec blocs animés ; glisse un bloc pour changer l'heure de la tâche, ou la barre pour parcourir la journée. Trait orange = heure actuelle.
- Les cartes et blocs bougent légèrement au survol.

## Carte et limites
La carte utilise Leaflet, les tuiles OpenStreetMap pour le plan, Esri World Imagery pour le satellite et une couche de libellés CARTO pour les noms de lieux. La recherche utilise le service public Nominatim et le calcul routier le service OSRM. Une connexion Internet est nécessaire et ces services publics peuvent avoir des limites de disponibilité ou d’usage. Le mode satellite avec noms est inclus ; **le vrai rendu 3D inclinable avec bâtiments en volume n’est pas inclus** dans cette version.

## Données
Les données sont stockées localement dans le navigateur (`localStorage`). Cette version n’inclut pas encore une base de données distante ni la synchronisation multi-appareils. Ne remplacez pas vos anciens fichiers avant d’avoir fait une copie de sauvegarde du dépôt.

## Dernières corrections
- Enregistrement des projets et tâches réparé (deux fonctions manquaient : ajout/suppression d'étape et vérification des chevauchements, désormais un simple avertissement).
- Emploi du temps façon Teams : journée de 00h à 24h, zone passée grisée, trait orange = maintenant ; glisse un bloc n'importe où, tire son bas pour changer la durée (enregistré automatiquement).
- Trajets : recherche d'adresses et itinéraires avec services de secours, et tracé à vol d'oiseau si aucun service routier ne répond. Fond de carte avec solution de secours.
- Musique : le lecteur Spotify (bouton « Musique » en bas à droite) continue pendant la navigation. Ouvre le site par `index.html`.
- Nouveautés : confettis à la validation d'une tâche, compte à rebours vers la prochaine tâche, raccourcis clavier (`/` recherche, `t` thème).

## Nouveautés (6 améliorations)
1. **Sauvegarde** : boutons « Exporter / Importer » dans le menu latéral (fichier .json à garder).
2. **Créer / modifier dans l'emploi du temps** : double-clic sur un créneau, bouton « ＋ Tâche », clic sur un bloc pour le modifier ou le supprimer.
3. **Application installable (PWA)** : `manifest.webmanifest`, `sw.js`, dossier `icons/`. Fonctionne hors connexion une fois visitée. Les notifications restent actives uniquement quand le site est ouvert (il faudrait un serveur pour les autres cas).
4. **Tâches récurrentes** : « Répéter » + « Jusqu'au » dans le formulaire de projet.
5. **Déplacer une tâche vers un autre jour** : glisser la carte de la tâche sur un jour du calendrier (ordinateur) ; sur mobile, clic sur le bloc de l'emploi du temps puis changer la date.
6. **Plus de douceur** : photos dans les souvenirs, compteur « jours ensemble » sur l'accueil, objectifs avec curseur de progression dans les statistiques.
