import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { JuegosModule } from './modulos/juegos/juegos.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JuegosModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'salaJuegos';
}
