import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokedex';
  bodesplegarTarjetas: boolean = false;

  desplegarTarjetas() {
    this.bodesplegarTarjetas = !this.bodesplegarTarjetas;
  }
}
