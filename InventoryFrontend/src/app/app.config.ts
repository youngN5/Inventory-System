import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      BrowserAnimationsModule,
      MatTableModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      MatProgressSpinnerModule
    )
  ]
};
