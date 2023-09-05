import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Pokemon, PokemonChainEvolution, PokemonDescripcion, PokemonService, Resultado } from 'src/app/services/pokemon.service';
import { PokemonSpecies } from '../../services/pokemon.service';

import { fadeInOutAnimation } from '../../animaciones/animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOutAnimation]
})
export class HomeComponent implements OnInit {

  idEvolucion: string = "";

  listaPokemon: Resultado[] = [];
  pagina: number = 1;
  cargando: boolean = false;
  pokemonSeleccionado?: Pokemon;
  pokemonSpecies?: PokemonSpecies;
  pokemonEvolutionChain?: PokemonChainEvolution;
  pokemonDescripcion?: PokemonDescripcion;
  boPrincipalPages:boolean = true;

  constructor(private pokemonService: PokemonService) { }
  @ViewChild('tarjetas') tarjetasElement!: ElementRef;

  @Input() bodesplegarTarjetas: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bodesplegarTarjetas']) {
      this.boPrincipalPages = false
    }
  }

  ngOnInit(): void {
    this.CargaLista();
    this.boPrincipalPages = true
  };

  async CargaLista() {
    this.cargando = true;
    this.listaPokemon = [...this.listaPokemon, ...await this.pokemonService.getByPage(this.pagina)];
    this.cargando = false;
    this.pagina++;
  }

  onScroll(e: any) {
    if (this.cargando) return;
    if (
      Math.round(
        this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
      )
      === e.srcElement.scrollHeight) {
      this.CargaLista();
    }
  }

  async tarjetaSeleccionada(id: string) {
    this.pokemonSeleccionado = await this.pokemonService.getById(id);
    this.pokemonSpecies = await this.pokemonService.getByIdSpecies(id);
    if (this.pokemonSpecies) {
      this.idEvolucion = this.pokemonSpecies.evolution_chain.url.substring(42, this.pokemonSpecies.evolution_chain.url.length - 1);
      this.cadenaEvolucion(this.idEvolucion);
    }
    this.pokemonDescripcion = await this.pokemonService.getByIdDescripcion(id);
  }

  async cadenaEvolucion(idEvolucion: string) {
    this.pokemonEvolutionChain = await this.pokemonService.getByIdEvolution(idEvolucion);
  }

}
