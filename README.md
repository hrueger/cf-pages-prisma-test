# Prisma CF Pages Test

## Development
```sh
yarn dev
```

## Deployment
- Manually add binding in cf dashboard
```sh
yarn build
npx wrangler pages deploy .svelte-kit/cloudflare
npx wrangler pages deployment tail --project-name cf-workers-prisma-test
```

## DB Migrations
```sh
npx wrangler d1 execute MY_DB --file prisma/migrations/20240317083105_initial/migration.sql
npx wrangler d1 execute MY_DB --file prisma/migrations/20240317083105_initial/migration.sql --remote
```