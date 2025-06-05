import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-mayor-menor',
  imports: [MatCardModule, CommonModule, MatButtonModule,RouterLink],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit{

cartaActual: number = 0;
cartaNueva: number = 0;
puntaje: number = 0;
mensaje: string = '';
juegoTerminado: boolean = false;

constructor(private authSvc: AuthService){}

ngOnInit() {
  this.iniciarJuego();
}

iniciarJuego() {
  this.cartaActual = this.obtenerCarta();
  this.puntaje = 0;
  this.mensaje = '';
  this.juegoTerminado = false;
}

obtenerCarta(): number {
  return Math.floor(Math.random() * 13) + 1;
}

async adivinar(opcion: 'mayor' | 'menor') {
  if (this.juegoTerminado) return;

  this.cartaNueva = this.obtenerCarta();

  const esMayor = this.cartaNueva > this.cartaActual;
  const esMenor = this.cartaNueva < this.cartaActual;

  if (
    (opcion === 'mayor' && esMayor) ||
    (opcion === 'menor' && esMenor)
  ) {
    this.puntaje++;
    this.mensaje = `✅ Adivinaste!`;
  } else {
    await this.authSvc.guardarPuntaje('mayormenor', this.puntaje);
    this.mensaje = `❌ Fallaste. Fin del juego`;
    this.juegoTerminado = true;
  }

  this.cartaActual = this.cartaNueva;
}

}
