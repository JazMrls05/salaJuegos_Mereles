import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-carrera-orden',
  imports: [CommonModule, MatButtonModule,RouterLink,MatSnackBarModule],
  templateUrl: './carrera-orden.component.html',
  styleUrl: './carrera-orden.component.css'
})
export class CarreraOrdenComponent implements OnInit, OnDestroy{
  numeros: number[] = [];
  siguienteNumero = 1;
  juegoTerminado = false;

  tiempo: number = 0;
  private intervalId: any;

  constructor(private authSvc: AuthService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.iniciarJuego();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  iniciarJuego() {
    this.juegoTerminado = false;
    this.siguienteNumero = 1;
    this.numeros = this.generarNumerosAleatorios(25);

    this.tiempo = 0;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.tiempo++;
    }, 1000);
  }

  generarNumerosAleatorios(cantidad: number): number[] {
    const array = Array.from({ length: cantidad }, (_, i) => i + 1);
    return array.sort(() => 0.5 - Math.random());
  }

  async seleccionarNumero(n: number) {
    if (n === this.siguienteNumero) {
      this.siguienteNumero++;
      if (this.siguienteNumero > 25) {
        this.juegoTerminado = true;
        clearInterval(this.intervalId);

        try{
          await this.authSvc.guardarPuntaje('carrera en orden', this.tiempo);
          this.snackBar.open(`¡Juego terminado! Secuencia completada en: ${this.tiempo} segundos`, 'Cerrar',{
            duration: 3000,
            horizontalPosition:'center',
            verticalPosition:'top',
          });
        } catch (error){
          console.error(error);
          this.snackBar.open('Error al guardar el puntaje', 'Cerrar', {
            duration:3000,
            horizontalPosition:'center',
            verticalPosition:'top',
          });
        }
      }
    }
  }

  reiniciar() {
    this.iniciarJuego();
  }
}
