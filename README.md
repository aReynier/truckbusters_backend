# Documentation du back-end de Truckbusters

Ce dépôt contient le back-end de l’application Truckbusters.  
Il permet de gérer des rendez-vous de contrôle technique pour des camions.

## Sommaire

- [Description](#description)
- [Démo](#démo)
- [Technologies utilisées](#technologies-utilisées)
- [Lancement en local](#lancement-en-local)
- [Fonctionnalités](#fonctionnalités)
- [Guide de déploiement](#guide-de-déploiement)

## Description

Le back-end expose une API REST pour créer, consulter, modifier et supprimer des rendez-vous.

## Démo

Une démo de ce back-end est disponible à l'adresse suivante: https://vps-44ce19bc.vps.ovh.net/api/v1/appointment

## Technologies utilisées

Le projet repose sur :

- Node.js / Express
- MongoDB
- Docker / Docker Compose
- GitHub Actions (CI/CD)

## Lancement en local

1. Cloner ce dépôt:

```
git clone https://github.com/aReynier/truckbusters_backend.git
cd truckbusters_backend
```

2. Créer les fichiers d’environnement à partir de `.env.example`:

- `.env.dev`
- `.env.prod`

3. Lancer les conteneurs en développement:

```
docker compose -f docker-compose.dev.yml up --build
```

4. L’API est alors disponible sur :

```
http://localhost:3002
```

## Fonctionnalités

Gestion des rendez-vous (CRUD) via l’API :

- GET /api/v1/appointment
- POST /api/v1/appointment
- PUT /api/v1/appointment/:id
- DELETE /api/v1/appointment/:id

## Guide de déploiement

[Le guide complet est disponible ici: deployment-guide.md](deployment-guide.md)
