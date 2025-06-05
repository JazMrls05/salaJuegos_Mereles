import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-resultados',
  imports: [MatTableModule, CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent implements OnInit{

  puntajes: any[] = [];

  constructor(private firebaseSvc: AuthService){}

  async ngOnInit(){
    this.puntajes = await this.firebaseSvc.obtenerPuntajes();
  }

    obtenerColor(juego: string): string {
    switch (juego.toLowerCase()) {
      case 'mayormenor': return '#3CCD6D'; 
      case 'ahorcado': return '#ffdf80';   
      case 'preguntados': return '#9999ff'; 
      case 'carrera en orden': return '#d3a4db'; 
      default: return '#ffffff';
      }
    }
}
