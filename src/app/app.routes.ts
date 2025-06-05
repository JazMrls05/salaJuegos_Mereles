import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./componentes/home/home.component').then(c => c.HomeComponent) 
    },    
    {
        path:'home',
        loadComponent: () => import('./componentes/home/home.component').then(c => c.HomeComponent)
    },
    {
        path:'login',
        loadComponent: () => import('./componentes/login/login.component').then(c => c.LoginComponent)
    },

    {
        path:'quien-soy',
        loadComponent: () => import('./componentes/quien-soy/quien-soy.component').then(c => c.QuienSoyComponent)
    },
    {
        path:'registro',
        loadComponent: () => import('./componentes/registro/registro.component').then(c => c.RegistroComponent)
    },
    {
        path:'juegos',
        loadChildren: () => import('./modulos/juegos/juegos.module').then(m => m.JuegosModule)
    },
];
