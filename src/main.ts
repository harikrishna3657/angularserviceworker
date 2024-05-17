import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      // your routes here
    ]),
    importProvidersFrom(
      FormsModule,
      ServiceWorkerModule.register('ngsw-worker.js')
    )
  ]
});
