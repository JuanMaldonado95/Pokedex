import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Resultado } from 'src/app/services/pokemon.service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-tarjeta-pokemon',
  templateUrl: './tarjeta-pokemon.component.html',
  styleUrls: ['./tarjeta-pokemon.component.scss']
})
export class TarjetaPokemonComponent {

  constructor(private pokemonService: PokemonService) { }

  ngOnChanges(): void {
    this.extraerInformacion()
  }

  @Input() data?: Resultado;
  @Output() selectPokemon = new EventEmitter<string>();

  idPokemon: string = "0";

  extraerInformacion() {
    if (this.data && this.data.url !== "") {
      this.idPokemon = this.data.url.substring(34, this.data.url.length - 1);
      return
    }
  }

}
