import { sveltekit } from '@sveltejs/kit/vite';
import wasm from "vite-plugin-wasm-esm";
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [wasm([".prisma/client"]), sveltekit()]
});
