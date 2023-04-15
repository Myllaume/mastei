---
title: Idées en vrac
lang: fr
---

- Reprendre le concept de https://twinery.org/
  - Export HTML _all-in-one_ permettant la visualisation de textes successifs en cliquant sur des liens
  - interface bibliothèque permettant d'importer/export les narrations
  - Saisie du CSS et JS agnostique : on peut importer tout type de scripts reposant sur le navigateur et non le moteur de rendu
- On ajoute d'autres fonctionnalités
  - de storytelling
    - permettre de partir de différents points de l'histoire
    - permettre d'exporter non pas un seul fichier HTML mais plusieurs
    - multilingue
  - purement technique
    - en SVG
    - modulaire, possiblité d'agrémenter facilement les exports de JS, CSS
    - On ajoute les solutions de https://cosma.graphlab.fr/ sur la gestion des données
      - données libérées du logiciel et export en source text libre
      - système de liens avec identifiants
      - séparation entre le logiciel de gestion des données/rendu (mastei) et les logiciels d'écriture (éditeurs de texte divers)
- Le logiciel sera une CLI avec interface graphique en localhost
  - Plusieurs modes de visualisations de la même base : user, debug (user with tools) & dev
- La stack technique
  - typescript
  - Vue ou React
  - Markdown - YAML
