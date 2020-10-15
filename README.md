# Todo API

API d'une todo app dans le cadre du cours D21 - Node/Electron donné à l'IT-Akademy.

Pour référence, un workspace [Insomnia](https://insomnia.rest/download/core/?) contenant toutes les routes avec des exemples est fourni dans le dossier `insomniaData`.

## Pré-requis

[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

[https://yarnpkg.com](https://yarnpkg.com)

## Lancer le projet

Afin de lancer le projet et d'avoir votre API qui tourne, lancez simplement la commande

```bash
yarn docker:dev
```

Puis, pour initialiser la base de donnée, lancez les commandes :

```bash
knex migrate:latest
```

```bash
knex seed:run
```

Pour s'authentifier, utilisez la route `http://locahost:3000/api/v1/user/login` pour récupérer votre token JWT, puis ajoutez ce token
 à vos header ainsi :
 
```http request
Authorization : Bearer {{xxxx.yyyy.zzzz}}
```

Les comptes disponibles sont les suivants :
```json
{
    // Admin
    "username": "foo",
    "password": "bar"
}

{
    "username": "Jhon Doe",
    "password": "1234"
}

{
    "username": "Alice",
    "password": "1234"
}
```
