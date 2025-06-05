import { Component } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import {Router, RouterLink} from '@angular/router';

// Diseño
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

// FirebaseAuth
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatInputModule, 
    MatFormFieldModule, FormsModule, 
    MatButtonModule, MatIconModule,
    RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  ocultarClave: boolean = true;
  usuario!:Usuario;
  email:string = "";
  clave:string ="";

  constructor(private router: Router, private authService: AuthService) {}

    irA(path:string){
    this.router.navigateByUrl(path);
  } 

  validarDatos()
  {
    this.usuario = new Usuario(this.email, this.clave);
        this.authService.acceder(this.usuario.email, this.usuario.clave)
      .then(() => this.irA('home'))
      .catch((e) => {
        document.getElementById("p-error-login")!.hidden = false;
        console.error(e);
      });
  }

    autocompletarAdmin(){
    this.email = 'admin@admin.com';
    this.clave = '111administrador111';
  }

    autocompletarJaz(){
    this.email = 'jaz@jaz.com';
    this.clave = '333333';
  }

  salirAlHome(): void {
  this.authService.cerrarSesion()
    .then(() => {
      this.router.navigate(['/home']);
    })
    .catch((e) => console.error('Error al cerrar sesión', e));
}



}
