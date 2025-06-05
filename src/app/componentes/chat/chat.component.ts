import { Component, NgModule, OnInit, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy, Timestamp } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

//Diseño
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat',
  standalone:true,
  imports: [MatCardModule, CommonModule, MatFormField, FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{

  private firestore = inject(Firestore);
  private auth = inject(Auth);

  mensajes$!: Observable<any[]>;
  nuevoMensaje: string = '';

  ngOnInit(): void {
    const mensajesRef = collection(this.firestore, 'mensajes');
    const q = query(mensajesRef, orderBy('fecha'));
    this.mensajes$ = collectionData(q, { idField: 'id' });
  }

  async enviarMensaje() {
    const user = this.auth.currentUser;

    if (!user || !this.nuevoMensaje.trim()) return;

    const mensaje = {
      texto: this.nuevoMensaje.trim(),
      usuario: user.displayName,
      fecha: Timestamp.fromDate(new Date())
    };

    await addDoc(collection(this.firestore, 'mensajes'), mensaje);
    this.nuevoMensaje = '';
  }
}
