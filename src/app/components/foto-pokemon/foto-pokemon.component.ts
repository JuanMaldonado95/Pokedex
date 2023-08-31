import { Component, Input } from '@angular/core';
import { Pokemon, PokemonChainEvolution, PokemonDescripcion, PokemonSpecies } from 'src/app/services/pokemon.service';
import { Description } from '../../services/pokemon.service';

@Component({
  selector: 'app-foto-pokemon',
  templateUrl: './foto-pokemon.component.html',
  styleUrls: ['./foto-pokemon.component.scss']
})
export class FotoPokemonComponent {

  idPokemon?: number;
  descriptionPokemon?: string;
  genusPokemon?: string;
  generacion?: string;

  @Input() pokemon?: Pokemon;
  // @Input() pokemonSpecies?: PokemonSpecies;
  //@Input() pokemonDescripcion?: PokemonDescripcion;

  @Input()
  public set pokemonSpecies(pokemonSpecies: PokemonSpecies | undefined) {
    if (pokemonSpecies) {
      let genera = pokemonSpecies.genera
      for (const gen of genera) {
        if (gen.language.name === "en") {
          this.genusPokemon = gen.genus;
          break;
        }
      }
      this.generacion = pokemonSpecies.generation.name
    }
  }

  @Input()
  public set pokemonDescripcion(pokemonDescripcion: PokemonDescripcion | undefined) {
    if (pokemonDescripcion) {
      let description = pokemonDescripcion.descriptions
      for (const descrip of description) {
        if (descrip.language.name === "en") {
          this.descriptionPokemon = descrip.description;
          break;
        }
      }
    }
  };

}
