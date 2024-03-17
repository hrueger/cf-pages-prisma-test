// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface Platform {
			env: {
				MY_DB: import("@cloudflare/workers-types").D1Database;
			}
		}
	}
}

export {};
