import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { AuthService } from '../../servicios/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encuesta',
  imports: [MatCard, MatCardTitle,MatCardContent,MatFormFieldModule, MatInputModule, MatRadioModule, FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule, MatSnackBarModule, MatButtonModule, CommonModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {
  encuestaForm: FormGroup;

  constructor(private fBuilder: FormBuilder, private authService:AuthService, private snackBar: MatSnackBar){
    this.encuestaForm = this.fBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.compose([
        Validators.required , Validators.min(18), Validators.max(99)
      ])],
      telefono: ['', Validators.required],
      experiencia: ['', Validators.required],
      aspectos: this.fBuilder.group({
        estetica: [false],
        juegos:[false],
        interfaz:[false],
        nada:[false],
      }, { validators: this.validarAlMenosUnCheckbox }),
      sugerencia:['', Validators.required]
    });
      const aspectosGroup = this.encuestaForm.get('aspectos') as FormGroup;

      aspectosGroup.get('nada')?.valueChanges.subscribe((valorNada) => {
      if (valorNada) {
        aspectosGroup.patchValue({
          estetica: false,
          juegos: false,
          interfaz: false
        }, { emitEvent: false });
      }
    });

    ['estetica', 'juegos', 'interfaz'].forEach(campo => {
      aspectosGroup.get(campo)?.valueChanges.subscribe((valor) => {
        if (valor) {
          aspectosGroup.get('nada')?.setValue(false, { emitEvent: false });
        }
      });
    });
  }

  async enviarEncuesta(){
    if (this.encuestaForm.valid){
      const datos = this.encuestaForm.value;

      try{
        await this.authService.guardarEncuesta(datos);
        this.snackBar.open('Encuesta enviada con éxito!!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.encuestaForm.reset();
      } catch (error){
        console.error('Error al enviar la encuesta', error);
        this.snackBar.open('Error al enviar encuesta!!', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        });
      }
    }
    else{
      this.encuestaForm.markAllAsTouched();
      this.snackBar.open('Completá todos los campos!!', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      });
    }
  }

  validarAlMenosUnCheckbox(control: FormGroup) {
  const valores = Object.values(control.value);
  const algunoSeleccionado = valores.some(val => val === true);
  return algunoSeleccionado ? null : { requerido: true };
}
}
