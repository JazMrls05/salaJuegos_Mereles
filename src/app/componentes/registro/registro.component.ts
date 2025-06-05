import { Component, inject } from '@angular/core';
import {RouterLink, Router} from '@angular/router';
import { Usuario } from '../../modelos/usuario';
// Diseño
import { MatCardModule } from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
// Auth
import { AuthService } from '../../servicios/auth.service';



@Component({
  selector: 'app-registro',
  imports: [MatCardModule, FormsModule,MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  email: string = '';
  clave: string = '';
  alias: string = '';
  usuario!: Usuario;

  constructor(private router: Router, private authService: AuthService) {}

  irA(path: string ){
    this.router.navigateByUrl(path);
  }

  async registrarFirebase(){
    const errorElement = document.getElementById("p-error-registro") as HTMLParagraphElement;

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      errorElement.textContent = "El email no es válido";
      errorElement.hidden = false;
      return;
    }

    // Validación de longitud de clave
    if (this.clave.length < 6) {
      errorElement.textContent = "La contraseña debe tener al menos 6 caracteres";
      errorElement.hidden = false;
      return;
    }

    try {
      await this.authService.registrar(this.email, this.clave, this.alias);
      errorElement.hidden = true; // Oculta errores anteriores
      this.irA('home');
    } catch (e:any) {
      if (e.code === 'auth/email-already-in-use') {
        errorElement.textContent = "El usuario ya se encuentra registrado.";} 
      else {
        errorElement.textContent = "Algo salió mal al registrar";}
      errorElement.hidden = false;
      console.error(e);
    }
  }
}
