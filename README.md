# TP6 — Game Library

Application de gestion d'une collection de jeux vidéo avec **React**, **Redux Toolkit**
et **React-Bootstrap**.

Le cœur du TP (store, slice, `useSelector`, `useDispatch`) est conservé tel quel :
seule l'interface (design, CSS, structure des composants) a été personnalisée.

## Lancer le projet

```bash
npm install
npm run dev
```

## Fonctionnalités

- Afficher la collection de jeux (image, titre, genre, plateforme, prix).
- Ajouter un jeu via un formulaire dans une fenêtre modale (`addGame`).
- Modifier un jeu : le formulaire est pré-rempli puis validé (`updateGame`).
- Supprimer un jeu depuis sa carte (`deleteGame`).
- Recherche par titre ou genre et filtre par plateforme.
- Statistiques de collection (nombre de jeux, valeur totale en DT, plateformes).
- Interface responsive avec états vides et animations discrètes.

## Structure

```text
src/
├── Redux/
│   ├── gamesSlice.js     # createSlice + addGame / deleteGame / updateGame
│   └── store.js          # configureStore
├── components/
│   ├── AddGame.jsx       # formulaire d'ajout (useDispatch)
│   ├── EditGame.jsx      # formulaire de modification (useDispatch)
│   ├── GameCard.jsx      # carte d'un jeu (useDispatch -> deleteGame)
│   ├── GameList.jsx      # liste + filtres (useSelector + map)
│   └── Icons.jsx         # petites icônes SVG
├── App.jsx               # mise en page, statistiques, modale
├── index.css             # thème « dark neon » (design system)
└── main.jsx              # Provider react-redux
```

## Répartition Redux / UI

| Élément | Fichier | Rôle |
| --- | --- | --- |
| `createSlice` | `src/Redux/gamesSlice.js` | état initial et reducers |
| `configureStore` | `src/Redux/store.js` | store global |
| `Provider` | `src/main.jsx` | connexion du store à React |
| `useSelector` | `GameList.jsx`, `App.jsx` | lecture de l'état |
| `useDispatch` | `GameCard.jsx`, `AddGame.jsx`, `EditGame.jsx` | envoi des actions |

## Design

Thème sombre « néon gaming » : fond profond, accents violet/cyan, cartes en verre,
typographies Space Grotesk + Inter, modale d'édition et mise en page adaptative.