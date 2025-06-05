import { Component, inject } from '@angular/core';
import {RouterLink, Router} from '@angular/router';
import { CommonModule } from '@angular/common';

// Diseño
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

// Servicios
import { AuthService } from '../../servicios/auth.service';
import { ChatComponent } from '../chat/chat.component';
import { ResultadosComponent } from "../resultados/resultados.component";
import { EncuestaComponent } from "../encuesta/encuesta.component";


@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatToolbarModule, MatButtonModule,
    MatIconModule, RouterLink, CommonModule,
    MatSnackBarModule, MatSidenavModule, ChatComponent, ResultadosComponent, EncuestaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  usuarioActual: string = '';
  logueado: boolean = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {}

  chatActivo: boolean = false;
  encuestaActiva: boolean = false;
  resultadosActivo: boolean = false;

  activarChat() {
    this.chatActivo = true;
  }

  activarEncuesta() {
    this.encuestaActiva = true;
  }

  activarResultados() {
    this.resultadosActivo = true;
  }

  mostrarJuegos() {
    this.chatActivo = false;
    this.encuestaActiva = false;
    this.resultadosActivo = false;
  }

  ngOnInit(): void {
    const user = this.authService.getUsuarioActual();
    if (user) {
      this.logueado = true;
      this.usuarioActual = user.displayName || user.email || '';
    }
    else{
      this.logueado = false;
    }
  }

  jugar(nombreJuego: string): void {
    if (!this.logueado) {
      this.snackBar.open(' 📢Ey! Tenés que iniciar sesión para jugar  '+ nombreJuego, 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-aviso']
      });
      return;
    }

    switch (nombreJuego) {
    case 'Ahorcado':
      this.router.navigate(['/juegos/ahorcado']);
      break;
    case 'Mayor o menor':
      this.router.navigate(['/juegos/mayor-menor']);
      break;
    case 'Preguntados':
      this.router.navigate(['/juegos/preguntados']);
      break;
    case 'Carrera en orden':
      this.router.navigate(['/juegos/carrera-orden']);
      break;
    default:
      this.snackBar.open('Juego no encontrado', 'Cerrar', {
        duration: 2000
      });
      break;
  }

  }



}
