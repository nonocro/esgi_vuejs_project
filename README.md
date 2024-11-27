# esgi_vuejs_project

# Explication de l'application

Les possibilités sont en héritage de bas en haut :

## Sans être connecté
- L'utilisateur peut regarder tous les Pokémons existants.
- Il peut cliquer sur un Pokémon pour voir son détail.
- S'il veut mettre un Pokémon en favori, il doit se connecter. Ensuite, il pourra accéder à la page des favoris.

## En étant connecté
- L'utilisateur peut mettre des Pokémons en favoris et les retrouver dans la page des favoris.
- Accès à la page de profil, avec la possibilité de changer les informations.

## En étant admin
- L'admin a accès à une page d'administration qui lui permet de gérer les utilisateurs avec un système CRUD.

# Gestion des comptes

- Les comptes sont stockés dans un store, donc si on rafraîchit la page, nous perdons tout.


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```




### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
