import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { windowToggle } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withHashLocation()), provideClientHydration(), provideAnimationsAsync(),
  provideHttpClient(withFetch()),

  ]
};
