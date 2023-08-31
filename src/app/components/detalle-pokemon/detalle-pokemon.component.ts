import { Component, Input } from '@angular/core';
import { Pokemon, PokemonChainEvolution, PokemonGender, PokemonSpecies } from 'src/app/services/pokemon.service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-detalle-pokemon',
  templateUrl: './detalle-pokemon.component.html',
  styleUrls: ['./detalle-pokemon.component.scss']
})
export class DetallePokemonComponent {

  evolucionesArray: { name: string; url: string }[] = [];
  pokemonSeleccionado?: Pokemon;
  evoluciones?: Pokemon;
  evolucionesArrayComplete = false;
  evolucionesCompletas?: any = [];
  gender?: PokemonGender

  altura?: number;
  peso?: number;
  genero?: string;
  categoria?: string;
  habilidad?: string;
  eggGrupo?: string;
  idPokemonGenero?: number;

  genusPokemon?: string;
  generacion?: string;
  habitat?: string;


  constructor(public pokemonService: PokemonService) { }

  @Input()
  public set pokemon(pokemon: Pokemon | undefined) {
    if (pokemon) {
      this.altura = pokemon.height;
      this.peso = pokemon.weight;
      this.idPokemonGenero = pokemon.id
    }
    this.pokemonGender()
  }


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

      this.habitat = pokemonSpecies.habitat.name
      this.generacion = pokemonSpecies.generation.name
    }
  }

  @Input()
  public set pokemonEvolutionChain(pokemonEvolutionChain: PokemonChainEvolution | undefined) {
    this.evolucionesArrayComplete = false
    this.evolucionesArray = [];
    this.evolucionesCompletas = [];

    if (pokemonEvolutionChain) {
      this.extractSpecies(pokemonEvolutionChain.chain);
    };
  }

  extractSpecies(evolutionChain: any): void {
    this.evolucionesArray.push({
      name: evolutionChain.species.name,
      url: evolutionChain.species.url
    });

    if (evolutionChain.evolves_to.length > 0) {
      this.extractSpecies(evolutionChain.evolves_to[0]);
    } else {
      this.evolucionesArrayComplete = true;
      this.pokemonEvolution();
    }
  }

  async pokemonEvolution() {
    if (this.evolucionesArray.length > 0) {
      this.evolucionesArray.forEach(async x => {
        const idPokemon = x.url.substring(42, x.url.length - 1);
        this.evoluciones = await this.pokemonService.getById(idPokemon);
        this.evolucionesCompletas.push(this.evoluciones);
      })
    }
  }

  async pokemonGender() {
    if (this.idPokemonGenero != undefined) {
      const idPokemon = this.idPokemonGenero?.toString()
      this.gender = await this.pokemonService.getByIdGender(idPokemon);
      this.genero = this.gender.name
    }
  }


  public demoradarChartLabels: string[] = ['Designer', 'Developer', 'Tester', 'Clients', 'HR'];

  public demoradarChartData: any = [
    { data: [20, 40, 15, 30, 12], label: 'Company A' },
    { data: [30, 40, 20, 35, 15], label: 'Company B' }
  ];
  public radarChartType: string = 'radar';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
