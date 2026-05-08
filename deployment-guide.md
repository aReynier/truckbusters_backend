# Guide de déploiement - Back-end Truckbuster

## 1- Objectif

Ce guide vous présente les étapes essentielles pour déployer le Back-end de l'application Truckbusters.

## 2- Architecture du back-end

Le projet repose sur :

- une API Node.js / Express
- une base de données MongoDB
- Docker et Docker Compose pour l’exécution des services
- GitHub Actions pour l’intégration et le déploiement continus

## 3- Prérequis

Avant de commencer, vous devez disposer de:

- Ce présent dépôt
- Docker et docker compose installés
- Un compte Docker Hub
- Un VPS Linux avec Docker installé
- Des identifiants mongoDB
- Des identifiants SMTP
- Secrets GitHub Actions configurés

## 4- Configuration

cloner ce dépôt:

```
git clone https://github.com/aReynier/truckbusters_backend.git
```

- Créer à la racine de ce projet:
- `.env.dev`
- `.env.prod`

Ces fichiers doivent contenir les mêmes variables que `.env.example` :
| Variable | Description |
| ----------------------- | ------------------------------------ |
| `MONGO_USER` | Utilisateur MongoDB |
| `MONGO_PASSWORD` | Mot de passe MongoDB |
| `MONGO_INITDB_DATABASE` | Nom de la base MongoDB |
| `SMTP_EMAIL` | Adresse e-mail SMTP |
| `SMTP_PASSWORD` | Mot de passe SMTP |
| `USER_ID` | UID utilisateur Docker |
| `GROUP_ID` | GID groupe Docker |
| `MONGO_URI` | URI de connexion MongoDB |

## 5- Développement local

### Linters

Avant chaque push, vérifier la qualité du code :

```
npm run eslint
```

```
npm run prettier
```

### Test

Lancer également les tests:

- tests unitaires
- coverage
- tests d'intégration

```
npm run test
```

## 6- Structure CI/CD

Le dépôt contient :

- des Dockerfiles pour l'image de l’API (`Dockerfile.api-dev` et `Dockerfile.api-prod`)
- des fichiers Docker Compose (`docker-compose.dev.yml` et `docker-compose.prod.yml`) contenant:
  - Un conteneur API
  - Un conteneur base de données
  - Un réseau
  - Un volume
- des workflows GitHub Actions :
- `ci.yml` pour lint/build/test
- `cd.yml` pour build/push d’image Docker puis déploiement VPS

## 7- Déploiement local en dev

Lancer les conteneurs:

```
docker compose -f docker-compose.dev.yml up --build
```

L’API est accessible sur:

- http://localhost:3002

### 8- CI en développement

À chaque push de branche (et sur pull request), la CI GitHub Actions exécute :

la vérification lint (eslint + prettier) ;

- une étape de build
- une étape de test( unitaire + coverage + intégration)

## 9- Mise en place du VPS

Le VPS doit être préparé avec :

- Docker et Docker Compose installés ;
- un accès SSH configuré (clé privée côté GitHub Actions) ;
- le dépôt présent sur le serveur dans le dossier attendu par le workflow.

- Chemin utilisé dans le workflow : `truckbusters_app/truckbusters_backend`

## 10- Déploiement automatisé (production)

Le workflow CD se déclenche sur push vers main (et également sur pull request selon la configuration actuelle).

Il exécute :

1. le build et push de l’image Docker sur Docker Hub (latest + SHA commit)
2. la connexion SSH au VPS
3. la mise à jour du code côté VPS
4. le redémarrage des services avec: `docker compose -f docker-compose.prod.yml up -d --pull=always`

## 11- Secrets GitHub Actions requis

Actuellement, ils sont déjà paramétrés dan github Actions.
Si besoin, reconfigurer les secrets suivants:

- ENV
- DOCKERHUB_USERNAME
- DOCKERHUB_TRUCKBUSTERS_TOKEN
- VPS_HOST
- VPS_USERNAME
- SSH_KEY

## 12- Vérifications après déploiement

Sur le VPS, vérifier:

```
docker ps
docker compose -f docker-compose.prod.yml logs -f api
docker compose -f docker-compose.prod.yml logs -f database
```

Puis tester l'API via l'URL de votre serveur

## 13- Rollback

En cas de régression après déploiement, l’objectif est de revenir rapidement à une image Docker stable.

### Option A - Revenir à une image taggée par SHA

- `latest`
- `${GITHUB_SHA}`
  Sur le VPS :

1. Modifier `docker-compose.prod.yml` pour remplacer l’image `latest` par un SHA connu stable :

```
api:
  image: <dockerhub_username>/truckbusters-backend:<sha_stable>
```

2. Relancer les services:

```
docker compose -f docker-compose.prod.yml up -d --pull=always
```

3. Vérifier que les conteneurs sont sains:

```
docker ps
docker compose -f docker-compose.prod.yml logs -f api
```

### Option B - Revenir à un commit Git stable côté VPS

Si nécessaire, revenir à un commit stable dans le dépôt présent sur le VPS, puis relancer Docker Compose.
