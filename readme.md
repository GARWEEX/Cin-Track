# 🎬 CinéTrack

Application web permettant de découvrir un catalogue de films et de séries, de rechercher et filtrer des titres, de consulter leurs détails et de sauvegarder une liste de favoris.

## ✨ Fonctionnalités

- **Catalogue dynamique** : Affichage des films et séries sous forme de cards (affiche, titre, type et année de sortie).
- **Recherche en temps réel** : Filtrage instantané par titre.
- **Filtre par catégorie** : Affichage de tous les contenus (`Tous`), uniquement des films (`movie`) ou uniquement des séries (`series`).
- **Pagination** : Navigation par pages avec 8 éléments affichés par page.
- **Fenêtre modale (Modal)** : Affichage des informations complètes au clic sur une card (durée pour un film ou nombre de saisons pour une série, genres, réalisateurs, pays de production et description).
- **Gestion des favoris** :
  - Ajout et retrait via le bouton cœur sans ouvrir la modal (`stopPropagation`).
  - Affichage dans une sidebar avec compteur dynamique par type (Films / Séries).
  - Sauvegarde automatique dans le `localStorage`.
- **Design Responsive** : Interface adaptable sur mobile, tablette et ordinateur.

## 🛠️ Technologies utilisées

- **HTML5**
- **Tailwind CSS** (via CDN)
- **JavaScript (ES6+)** : Modules (`import` / `export`), `Fetch API` (`async` / `await`), manipulation du DOM, méthodes de tableaux (`map`, `filter`, `find`, `reduce`) et `localStorage`.

## 📁 Structure du projet

```text
Cin-Track/
├── img/
│   ├── full-heart.svg
│   └── heart.svg
├── js/
│   ├── api.js        # Appel fetch et gestion des erreurs API
│   ├── favorite.js   # Logique d'ajout, suppression et comptage des favoris
│   ├── filter.js     # Fonctions de recherche et de filtrage par type
│   ├── main.js       # Point d'entrée, événements et pagination
│   ├── storage.js    # Lecture et écriture dans le localStorage
│   └── ui.js         # Création des cards et gestion de la fenêtre modale
├── index.html        # Structure principale de l'application
└── README.md         # Documentation du projet
```

## 🚀 Installation et lancement

1. Cloner le dépôt :
   ```bash
   git clone <lien-de-votre-depot-github>
   cd Cin-Track
   ```
2. Ouvrir le dossier dans **VS Code**.
3. Lancer `index.html` avec l'extension **Live Server** (obligatoire pour exécuter les modules JavaScript ES6).

## 🔗 Source des données

Les données du catalogue sont chargées depuis l'API suivante :
`https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json`