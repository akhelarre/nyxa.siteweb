// https://astro.build/config
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
    site: "https://nyxa.wtf",
    integrations: [preact()], // <--- Asegúrate de que esta coma esté aquí
    vite: {
        server: {
            watch: {
                ignored: ['**/.vs/**']
            }
        }
    }
});