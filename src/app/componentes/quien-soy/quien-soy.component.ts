import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

//Diseño
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-quien-soy',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent {

}
