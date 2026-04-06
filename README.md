# Documentation du back-end de Truckbusters

## Démarrer le conteneur de développement

```
docker compose -f docker-compose.dev.yml up
```

## Linters

Avant d'effectuer un push d'une nouvelle fonctionnalité, tester le code avec eslint et prettier:

```
npm run eslint
```

```
npm run prettier
```
