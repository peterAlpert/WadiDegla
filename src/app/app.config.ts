// app.config.ts
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localeArEg from '@angular/common/locales/ar-EG';

registerLocaleData(localeArEg);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    provideAnimations(),
    provideToastr({
      timeOut: 2000,
      positionClass: 'custom-toast-top-right',
      preventDuplicates: true
    }),

    { provide: LOCALE_ID, useValue: 'ar-EG' }
  ]
};
