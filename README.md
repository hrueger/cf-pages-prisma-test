# Prisma CF Workers Test

```
yarn build
npx wrangler pages deploy .svelte-kit/cloudflare
npx wrangler pages deployment tail --project-name cf-workers-prisma-test
```

## Development (at least tried)

Run both commands in separate terminals
```
yarn build -w
npx wrangler pages dev .svelte-kit/cloudflare
```

--> would like to achieve dev environemt with hot reload by using the standard `yarn dev` command