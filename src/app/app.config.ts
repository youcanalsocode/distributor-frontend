import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withNoHttpTransferCache } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeuix/themes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MessageService } from 'primeng/api';

const VimekPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6', // Teal matching top of the logo
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
            950: '#042f2e'
        }
    }
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideZonelessChangeDetection(),
        provideHttpClient(withFetch()),
        provideClientHydration(withEventReplay(), withNoHttpTransferCache()),
        provideAnimationsAsync(),
        MessageService,
        providePrimeNG({
            theme: {
                preset: VimekPreset,
                options: {
                    darkModeSelector: '.dark'
                }
            }
        })
    ]
};

