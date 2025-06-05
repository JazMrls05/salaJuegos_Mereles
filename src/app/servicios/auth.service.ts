import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Firestore, Timestamp, setDoc, doc, collection, addDoc, query, orderBy, limit, getDocs, where, updateDoc } from '@angular/fire/firestore';

import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);

  getUsuarioActual(): User | null
  {
    return this.auth.currentUser;
  }

    // Registro
    async registrar(email: string, clave: string, alias: string): Promise<UserCredential> {
    const credencial = await createUserWithEmailAndPassword(this.auth, email, clave);
    await updateProfile(credencial.user, { displayName: alias });

    const uid = credencial.user.uid;
    await setDoc(doc(this.firestore,'usuarios',uid), {
      email: email,
      alias: alias,
      fechaIngreso : Timestamp.fromDate(new Date())
    });
  
    return credencial;
  }

  // Login
  acceder(email: string, clave: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, clave);
  }

  cerrarSesion(): Promise<void> {
  return this.auth.signOut();
  }

  // Juegos
async guardarPuntaje(juego: string, nuevoPuntaje: number): Promise<void> {
  if (nuevoPuntaje <= 0) return;

  const usuario = this.getUsuarioActual();
  if (!usuario) {
    throw new Error('Usuario no autenticado');
  }

  const puntajesRef = collection(this.firestore, 'puntajes');

  const q = query(puntajesRef,
    where('uid', '==', usuario.uid),
    where('juego', '==', juego),
    where('puntaje', '==', nuevoPuntaje)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const docRef = snapshot.docs[0].ref;
    await updateDoc(docRef, {
      fecha: Timestamp.now()
    });
  } else {
    await addDoc(puntajesRef, {
      uid: usuario.uid,
      alias: usuario.displayName,
      juego,
      puntaje: nuevoPuntaje,
      fecha: Timestamp.now()
    });
  }
}


  async obtenerPuntajes(){
    const usuario = this.getUsuarioActual();
    if (!usuario) throw new Error('Usuario no autenticado');

    const puntajesRef = collection(this.firestore,'puntajes');
    const q = query(puntajesRef,where('uid','==',usuario.uid),
    orderBy('juego'), orderBy('puntaje','desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }

  async guardarEncuesta(datosEncuesta: any): Promise<void>{
    const usuario = this.getUsuarioActual();
    const encuestasRef = collection(this.firestore, 'encuestas');

    if(!usuario){
      throw new Error('Usuario no autenticado');
    }

    const datos = {
      uid: usuario.uid,
      ...datosEncuesta,
      fecha: Timestamp.now()
    };

    await addDoc(encuestasRef,datos);

    
  }
}
