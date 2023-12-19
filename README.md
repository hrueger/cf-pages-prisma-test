# Prisma CF Workers Test

```
yarn build
npx wrangler pages deploy .svelte-kit/cloudflare
npx wrangler pages deployment tail --project-name cf-workers-prisma-test
```