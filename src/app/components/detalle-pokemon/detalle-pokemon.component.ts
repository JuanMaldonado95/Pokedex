import { Component, Input } from '@angular/core';
import { Pokemon, PokemonChainEvolution, PokemonGender, PokemonSpecies } from 'src/app/services/pokemon.service';
import { PokemonService, Stat } from '../../services/pokemon.service';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

import { fadeInOutAnimation } from '../../animaciones/animations'

@Component({
  selector: 'app-detalle-pokemon',
  templateUrl: './detalle-pokemon.component.html',
  styleUrls: ['./detalle-pokemon.component.scss'],
  animations: [fadeInOutAnimation]
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

  type: any = [];
  typeDamage: any = [];
  damageMore: any = [];
  damage: any = [];

  stats: any = [];
  moves: any = [];

  colorClass: string = '';
  colorClases = {
    'IndianRed': 'red-palette',
    'FireBrick': 'red-palette fire-brick dark-red',
    'Pink': 'pink-palette light-pink hot-pink deep-pink medium-violet-red pale-violet-red',
    'LightSalmon': 'orange-palette coral tomato orange-red dark-orange orange',
    'Gold': 'yellow-palette yellow light-yellow lemon-chiffon light-goldenrod-yellow papaya-whip moccasin peach-puff pale-goldenrod khaki dark-khaki',
    'Lavender': 'purple-palette thistle plum violet orchid fuchsia magenta medium-orchid medium-purple blue-violet dark-violet dark-orchid dark-magenta purple indigo slate-blue dark-slate-blue',
    'GreenYellow': 'green-palette chartreuse lawn-green lime lime-green pale-green light-green medium-spring-green spring-green medium-sea-green sea-green forest-green green dark-green yellow-green olive-drab olive dark-olive-green medium-aquamarine dark-sea-green light-sea-green dark-cyan teal',
    'Aqua': 'blue-palette light-cyan pale-turquoise aquamarine turquoise medium-turquoise dark-turquoise cadet-blue steel-blue light-steel-blue powder-blue light-blue sky-blue light-sky-blue deep-sky-blue dodger-blue cornflower-blue medium-slate-blue royal-blue blue medium-blue dark-blue navy midnight-blue',
    'Cornsilk': 'brown-palette blanched-almond bisque navajo-white wheat burlywood tan rosy-brown sandy-brown goldenrod dark-goldenrod peru chocolate saddle-brown sienna brown maroon',
    'White': 'white-palette snow honeydew mint-cream azure alice-blue ghost-white white-smoke seashell beige old-lace floral-white ivory antique-white linen lavender-blush misty-rose',
    'LightGray': 'gray-palette silver dark-gray gray dim-gray light-slate-gray slate-gray dark-slate-gray black'
  };

  colorTypeDamageMore: string = '';
  boMostrarInfo: boolean = false;

  constructor(public pokemonService: PokemonService) { }

  @Input()
  public set pokemon(pokemon: Pokemon | undefined) {
    this.stats = [];
    this.type = [];
    this.moves = [];
    if (pokemon) {
      this.altura = pokemon.height;
      this.boMostrarInfo = true;
      this.peso = pokemon.weight;
      this.idPokemonGenero = pokemon.id;
      const types = pokemon.types;
      for (let typ of types) {
        const value = typ.type;
        this.type.push(value);
      }
      const stats = pokemon.stats;
      for (let stat of stats) {
        const value = stat.base_stat;
        this.stats.push(value);
      }
      const moves = pokemon.moves;
      for (let move of moves) {
        const value = move.move;
        this.moves.push(value)
      }
    }
    this.radarChartData = {
      labels: this.radarChartLabels,
      datasets: [{ data: this.stats, label: 'stats base' }],
    };
    //this.pokemonGender();
    this.pokemonTypeDamege()
    this.pokemonMoves();
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
      this.habitat = pokemonSpecies.habitat.name;
      this.generacion = pokemonSpecies.generation.name;
      const pokemonColor = pokemonSpecies.color.name
      if (pokemonColor) {
        this.colorClass = this.getColorClassForPokemonColor(pokemonColor);
      }
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

  // async pokemonGender() {
  //   if (this.idPokemonGenero != undefined) {
  //     const idPokemon = this.idPokemonGenero?.toString()
  //     this.gender = await this.pokemonService.getByIdGender(idPokemon);
  //     this.genero = this.gender.name
  //   }
  // }

  async pokemonTypeDamege() {
    this.typeDamage = [];
    this.damageMore = [];
    this.damage = [];
    if (this.type) {
      for (let type of this.type) {
        const idPokemonTypeDamage = type.url.substring(31, type.url.length - 1);
        const typeDamage = await this.pokemonService.getByIdTypeDamage(idPokemonTypeDamage);
        this.typeDamage.push(typeDamage);
      }
    };
    if (this.typeDamage) {
      this.typeDamage.forEach((x: { damage_relations: { double_damage_from: any[]; }; }) => {
        if (x.damage_relations && x.damage_relations.double_damage_from) {
          x.damage_relations.double_damage_from.forEach(y => {
            this.damageMore.push(y.name);
          });
        }
        if(this.damageMore){
          for ( let color of this.damageMore)
          this.colorTypeDamageMore = color
          console.log(this.colorTypeDamageMore)
        }
      });
      this.typeDamage.forEach((x: {
        damage_relations: {
          double_damage_to
          : any[];
        };
      }) => {
        if (x.damage_relations && x.damage_relations.double_damage_to
        ) {
          x.damage_relations.double_damage_to
            .forEach(y => {
              this.damage.push(y.name);
            });
        }
      });
    }
  }

  async pokemonMoves() {
    if (this.moves) {
      for (let i = 0; i < this.moves.length; i++) {
        const move = this.moves[i];
        const idPokemonMoves = move.url.substring(31, move.url.length - 1);
        const typeMove = await this.pokemonService.getByIdMoves(idPokemonMoves);
        this.moves[i] = typeMove
      }
    }
  }

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public radarChartLabels: string[] = [
    'hp',
    'attack',
    'defense',
    'special-attack',
    'special-defense',
    'speed'
  ];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [],
  };


  public radarChartType: ChartType = 'radar';

  private getColorClassForPokemonColor(pokemonColor: string): string {
    const colorClases: { [colorName: string]: string } = {
      'indianRed': 'red-palette',
      'lightCoral': 'red-palette',
      'salmon': 'red-palette',
      'darkSalmon': 'red-palette',
      'lightSalmon': 'red-palette',
      'crimson': 'red-palette',
      'red': 'red-palette',
      'fireBrick': 'red-palette',
      'darkRed': 'red-palette',
      // Colores Rosas
      'pink': 'pink-palette',
      'lightPink': 'pink-palette',
      'hotPink': 'pink-palette',
      'deepPink': 'pink-palette',
      'mediumVioletRed': 'pink-palette',
      'paleVioletRed': 'pink-palette',
      // Colores Naranjas
      'coral': 'orange-palette',
      'tomato': 'orange-palette',
      'orangeRed': 'orange-palette',
      'darkOrange': 'orange-palette',
      'orange': 'orange-palette',
      // Colores Amarillos
      'gold': 'yellow-palette',
      'yellow': 'yellow-palette',
      'lightYellow': 'yellow-palette',
      'lemonChiffon': 'yellow-palette',
      'lightGoldenrodYellow': 'yellow-palette',
      'papayaWhip': 'yellow-palette',
      'moccasin': 'yellow-palette',
      'peachPuff': 'yellow-palette',
      'paleGoldenrod': 'yellow-palette',
      'khaki': 'yellow-palette',
      'darkKhaki': 'yellow-palette',
      // Colores Púrpuras
      'lavender': 'purple-palette',
      'thistle': 'purple-palette',
      'plum': 'purple-palette',
      'violet': 'purple-palette',
      'orchid': 'purple-palette',
      'fuchsia': 'purple-palette',
      'magenta': 'purple-palette',
      'mediumOrchid': 'purple-palette',
      'mediumPurple': 'purple-palette',
      'BlueViolet': 'purple-palette',
      'darkViolet': 'purple-palette',
      'darkOrchid': 'purple-palette',
      'darkMagenta': 'purple-palette',
      'purple': 'purple-palette',
      'indigo': 'purple-palette',
      'slateBlue': 'purple-palette',
      'darkSlateBlue': 'purple-palette',
      // Colores Verdes
      'greenYellow': 'green-palette',
      'chartreuse': 'green-palette',
      'lawnGreen': 'green-palette',
      'lime': 'green-palette',
      'limeGreen': 'green-palette',
      'paleGreen': 'green-palette',
      'lightGreen': 'green-palette',
      'mediumSpringGreen': 'green-palette',
      'springGreen': 'green-palette',
      'mediumSeaGreen': 'green-palette',
      'seaGreen': 'green-palette',
      'forestGreen': 'green-palette',
      'green': 'green-palette',
      'darkGreen': 'green-palette',
      'yellowGreen': 'green-palette',
      'oliveDrab': 'green-palette',
      'olive': 'green-palette',
      'darkOliveGreen': 'green-palette',
      'mediumAquamarine': 'green-palette',
      'darkSeaGreen': 'green-palette',
      'lightSeaGreen': 'green-palette',
      'darkCyan': 'green-palette',
      'teal': 'green-palette',
      // Colores Azules
      'aqua': 'blue-palette',
      'lightCyan': 'blue-palette',
      'paleTurquoise': 'blue-palette',
      'aquamarine': 'blue-palette',
      'turquoise': 'blue-palette',
      'mediumTurquoise': 'blue-palette',
      'darkTurquoise': 'blue-palette',
      'cadetBlue': 'blue-palette',
      'SteelBlue': 'blue-palette',
      'lightSteelBlue': 'blue-palette',
      'powderBlue': 'blue-palette',
      'lightBlue': 'blue-palette',
      'skyBlue': 'blue-palette',
      'lightSkyBlue': 'blue-palette',
      'deepSkyBlue': 'blue-palette',
      'dodgerBlue': 'blue-palette',
      'cornflowerBlue': 'blue-palette',
      'mediumSlateBlue': 'blue-palette',
      'royalBlue': 'blue-palette',
      'blue': 'blue-palette',
      'mediumBlue': 'blue-palette',
      'darkBlue': 'blue-palette',
      'navy': 'blue-palette',
      'midnightBlue': 'blue-palette',
      // Colores Marrones
      'cornsilk': 'brown-palette',
      'blanchedAlmond': 'brown-palette',
      'bisque': 'brown-palette',
      'navajoWhite': 'brown-palette',
      'wheat': 'brown-palette',
      'burlywood': 'brown-palette',
      'tan': 'brown-palette',
      'rosyBrown': 'brown-palette',
      'sandyBrown': 'brown-palette',
      'goldenrod': 'brown-palette',
      'darkGoldenrod': 'brown-palette',
      'peru': 'brown-palette',
      'chocolate': 'brown-palette',
      'saddleBrown': 'brown-palette',
      'sienna': 'brown-palette',
      'brown': 'brown-palette',
      'maroon': 'brown-palette',
      // Colores Blancos y Pasteles
      'white': 'white-palette',
      'snow': 'white-palette',
      'honeydew': 'white-palette',
      'mintCream': 'white-palette',
      'azure': 'white-palette',
      'aliceBlue': 'white-palette',
      'ghostWhite': 'white-palette',
      'whiteSmoke': 'white-palette',
      'seashell': 'white-palette',
      'beige': 'white-palette',
      'oldLace': 'white-palette',
      'floralWhite': 'white-palette',
      'ivory': 'white-palette',
      'antiqueWhite': 'white-palette',
      'linen': 'white-palette',
      'lavenderBlush': 'white-palette',
      'mistyRose': 'white-palette',
      // Colores Grises
      'gainsboro': 'gray-palette',
      'lightGray': 'gray-palette',
      'silver': 'gray-palette',
      'darkGray': 'gray-palette',
      'gray': 'gray-palette',
      'dimGray': 'gray-palette',
      'lightSlateGray': 'gray-palette',
      'slateGray': 'gray-palette',
      'darkSlateGray': 'gray-palette',
      'black': 'gray-palette',
    };
  
    if (colorClases[pokemonColor]) {
      return colorClases[pokemonColor];
    } else {
      return '';
    }
  }

  private getTypeClassForPokemonType(colorTypeDamageMore: string): string {
    const typeClasses: { [typeName: string]: string } = {
      'steal': 'tipo-acero',
      'water': 'tipo-agua',
      'bug': 'tipo-bicho',
      'dragon': 'tipo-dragón',
      'electric': 'tipo-eléctrico',
      'ghost': 'tipo-fantasma',
      'fire': 'tipo-fuego',
      'fairy': 'tipo-hada',
      'ice': 'tipo-hielo',
      'lucha': 'tipo-lucha',
      'normal': 'tipo-normal',
      'planta': 'tipo-planta',
      'psychic': 'tipo-psíquico',
      'rock': 'tipo-roca',
      'siniestro': 'tipo-siniestro',
      'ground': 'tipo-tierra',
      'poison': 'tipo-veneno',
      'flying': 'tipo-volador',
      // Agrega más tipos y clases aquí si es necesario
    };
  
    if (typeClasses[colorTypeDamageMore]) {
      return typeClasses[colorTypeDamageMore];
    } else {
      return '';
    }
  }
  

}
