import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyDkRoXRiRMim16nORFopswmgSviRjYyLlo",
  authDomain: "salajuegos-a4ff6.firebaseapp.com",
  projectId: "salajuegos-a4ff6",
  storageBucket: "salajuegos-a4ff6.firebasestorage.app",
  messagingSenderId: "447928657543",
  appId: "1:447928657543:web:29c4ddfb3f85c8f101ba22"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideHttpClient(),
      provideAuth(() => getAuth()),
      provideFirestore(()=> getFirestore()),
      importProvidersFrom(FormsModule),
  ],
};
