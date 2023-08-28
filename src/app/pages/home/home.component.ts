import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pokemon, PokemonService, Resultado } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listaPokemon: Resultado[] = [];
  pagina: number = 1;
  cargando: boolean = false;
  pokemonSeleccionado?: Pokemon;

  constructor(private pokemonService: PokemonService) { }
  @ViewChild('tarjetas') tarjetasElement!: ElementRef;


  ngOnInit(): void {
    this.CargaLista();
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

  async tarjetaSeleccionada(id: string){
    this.pokemonSeleccionado = await this.pokemonService.getById(id)
  }

}
