import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit {

  //#region Juego

  palabrasDisponibles: string[] = ['JUGUEMOS','ANGULAR', 'MODULOS','PROGRAMACION','PROMOCION',
  'COMPONENTES','ANIMACIONES','LABORATORIO','TERMINAL','TYPESCRIPT',
  'EPICO','ASOMBROSO','PALABRAS','APLICACION','CODIGO','SIMULADOR'];
  letrasAdivinadas: string[] = [];
  letrasErradas: string[] = [];
  letrasDisponibles: string[] = [];
  palabraOculta:string = '';
  maxIntentos = 6;
  puntaje: number = 0;
  mejorPuntaje: number = 0;

  constructor(private authSvc: AuthService ,private router: Router){}

  ngOnInit(): void {
    this.puntaje = 0;
    this.letrasDisponibles = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
    this.palabraOculta = this.obtenerPalabraRandom();
  }

seleccionarLetra(letra: string) {
  if (this.letrasAdivinadas.includes(letra) || this.letrasErradas.includes(letra)) return;

  if (this.palabraOculta.includes(letra)) {
    this.letrasAdivinadas.push(letra);
    if (this.juegoGanado()) {
      this.puntaje += 10;

      if (this.puntaje > this.mejorPuntaje) {
        this.mejorPuntaje = this.puntaje;
      }
    }

  } else {
    this.letrasErradas.push(letra);

    if (this.juegoPerdido()) {
      if (this.puntaje > this.mejorPuntaje) {
        this.mejorPuntaje = this.puntaje;
      }
      this.puntaje = 0;
    }
  }
}


  obtenerPalabraRandom(): string {
    const index = Math.floor(Math.random() * this.palabrasDisponibles.length);
    return this.palabrasDisponibles[index];
  }

  letraMostrada(letra: string): string {
    return this.letrasAdivinadas.includes(letra) ? letra : '_';
  }

  juegoPerdido(): boolean {
    return this.letrasErradas.length >= this.maxIntentos;
  }

  juegoGanado(): boolean {
    return this.palabraOculta.split('').every(l => this.letrasAdivinadas.includes(l));
  }

  reiniciarJuego() {
    this.letrasAdivinadas = [];
    this.letrasErradas = [];
    this.letrasDisponibles = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
    this.palabraOculta = this.obtenerPalabraRandom();

  }

  salirDelJuego() {
    const puntajeFinal = this.mejorPuntaje;
    if (puntajeFinal > 0) {
      this.authSvc.guardarPuntaje('ahorcado', puntajeFinal)
        .finally(() => this.router.navigate(['/home']));
    } else {
      this.router.navigate(['/home']);
    }
  }


  //endregion

}
