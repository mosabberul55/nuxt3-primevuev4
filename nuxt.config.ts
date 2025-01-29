import {MyPresetTheme} from "./theme/app-theme";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    ssr: true,
    modules: [
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt',
      '@primevue/nuxt-module',
      '@vee-validate/nuxt',
      '@nuxt/icon'
    ],
    primevue: {
        autoImport: true,
        usePrimeVue: true,
        options: {
            theme: {
                preset: MyPresetTheme,
                // cssLayer: false,
                options: {
                    darkModeSelector: '.my-app-dark',
                    cssLayer: {
                        name: 'primevue',
                        order: 'tailwind-base, primevue, tailwind-utilities'
                    }
                },
            },
            ripple: true,
        },
    }
})