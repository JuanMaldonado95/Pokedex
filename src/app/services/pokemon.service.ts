import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  async getByPage(page: number, size: number = 40): Promise<Resultado[]> {
    if (page > 1000) return [];
    const offset = size * (page - 1);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`)
    const resJson = await res.json();
    if (resJson.results.length > 0) return resJson.results
    return [];
  };

  async getById(id: string): Promise<Pokemon> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return await res.json();
  }

  async getByIdEvolution(id: string): Promise<PokemonChainEvolution> {
    const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
    return await res.json();
  }

  async getByIdSpecies(id: string): Promise<PokemonSpecies> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    return await res.json();
  }

  async getByIdDescripcion(id: string): Promise<PokemonDescripcion> {
    const res = await fetch(`https://pokeapi.co/api/v2/characteristic/${id}`)
    return await res.json();
  }

  async getByIdGender(id: string): Promise<PokemonGender> {
    const res = await fetch(`https://pokeapi.co/api/v2/gender/${1}`)
    return await res.json();
  }
}

export interface Data {
  count: number,
  next: string,
  previous: string,
  results: Resultado[]
}

export interface Resultado {
  name: string,
  url: string,
}


export interface Ability2 {
  name: string;
  url: string;
}

export interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: Ability2;
}

export interface Form {
  name: string;
  url: string;
}

export interface Version {
  name: string;
  url: string;
}

export interface GameIndice {
  game_index: number;
  version: Version;
}

export interface Item {
  name: string;
  url: string;
}

export interface Version2 {
  name: string;
  url: string;
}

export interface VersionDetail {
  rarity: number;
  version: Version2;
}

export interface HeldItem {
  item: Item;
  version_details: VersionDetail[];
}

export interface Move2 {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export interface MoveLearnMethod {
  name: string;
  url: string;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  version_group: VersionGroup;
  move_learn_method: MoveLearnMethod;
}

export interface Move {
  move: Move2;
  version_group_details: VersionGroupDetail[];
}

export interface Species {
  name: string;
  url: string;
}

export interface DreamWorld {
  front_default: string;
  front_female?: any;
}

export interface Home {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface OfficialArtwork {
  front_default: string;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  front_default: string;
  front_gray: string;
}

export interface Yellow {
  back_default: string;
  back_gray: string;
  front_default: string;
  front_gray: string;
}

export interface GenerationI {
  "red-blue": RedBlue;
  yellow: Yellow;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface Silver {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Silver;
}

export interface Emerald {
  front_default: string;
  front_shiny: string;
}

export interface FireredLeafgreen {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface RubySapphire {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface GenerationIii {
  emerald: Emerald;
  "firered-leafgreen": FireredLeafgreen;
  "ruby-sapphire": RubySapphire;
}

export interface DiamondPearl {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface HeartgoldSoulsilver {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface Platinum {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface GenerationIv {
  "diamond-pearl": DiamondPearl;
  "heartgold-soulsilver": HeartgoldSoulsilver;
  platinum: Platinum;
}

export interface Animated {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface BlackWhite {
  animated: Animated;
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface GenerationV {
  "black-white": BlackWhite;
}

export interface OmegarubyAlphasapphire {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface XY {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface GenerationVi {
  "omegaruby-alphasapphire": OmegarubyAlphasapphire;
  "x-y": XY;
}

export interface Icons {
  front_default: string;
  front_female?: any;
}

export interface UltraSunUltraMoon {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface GenerationVii {
  icons: Icons;
  "ultra-sun-ultra-moon": UltraSunUltraMoon;
}

export interface Icons2 {
  front_default: string;
  front_female?: any;
}

export interface GenerationViii {
  icons: Icons2;
}

export enum Versions {
  "generation-i" = "GenerationI",
  "generation-ii" = "GenerationIi",
  "generation-iii" = "GenerationIii",
  "generation-iv" = "GenerationIv",
  "generation-v" = "GenerationV",
  "generation-vi" = "GenerationVi",
  "generation-vii" = "GenerationVii",
  "generation-viii" = "GenerationViii"
}

export interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
  other: Other;
  versions: Versions;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Stat;
}

export interface Type {
  slot: number;
  type: TypeDetail;
}

export interface TypeDetail {
  name: string;
  url: string;
}

export interface Generation {
  name: string;
  url: string;
}


export interface PastType {
  generation: Generation;
  types: Type[];
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Form[];
  game_indices: GameIndice[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
}

export interface PokemonChainEvolution {
  id: number;
  baby_trigger_item: null;
  chain: Chain;
}

export interface Chain {
  is_baby: boolean;
  species: Species;
  evolution_details: EvolutionDetail[] | null;
  evolves_to: Chain[];
}

export interface EvolutionDetail {
  item: null;
  trigger: Species;
  gender: null;
  held_item: null;
  known_move: null;
  known_move_type: null;
  location: null;
  min_level: number;
  min_happiness: null;
  min_beauty: null;
  min_affection: null;
  needs_overworld_rain: boolean;
  party_species: null;
  party_type: null;
  relative_physical_stats: null;
  time_of_day: string;
  trade_species: null;
  turn_upside_down: boolean;
}

export interface Species {
  name: string;
  url: string;
}


export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: Color;
  pokedex_numbers: PokedexNumber[];
  egg_groups: Color[];
  color: Color;
  shape: Color;
  evolves_from_species: Color;
  evolution_chain: EvolutionChain;
  habitat: habitat;
  generation: Color;
  names: Name[];
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: FormDescription[];
  genera: Genus[];
  varieties: Variety[];
}

export interface habitat {
  name: string;
  url: string;
}

export interface Color {
  name: string;
  url: string;
}

export interface EvolutionChain {
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Color;
  version: Color;
}

export interface FormDescription {
  description: string;
  language: Color;
}

export interface Genus {
  genus: string;
  language: Color;
}

export interface Name {
  name: string;
  language: Color;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: Color;
}

export interface Variety {
  is_default: boolean;
  pokemon: Color;
}


export interface PokemonDescripcion {
  id: number;
  gene_modulo: number;
  possible_values: number[];
  highest_stat: HighestStat;
  descriptions: Description[];
}

export interface Description {
  description: string;
  language: HighestStat;
}

export interface HighestStat {
  name: string;
  url: string;
}

export interface PokemonGender {
  id: number;
  name: string;
  pokemon_species_details: PokemonSpeciesDetail[];
  required_for_evolution: RequiredForEvolution[];
}

export interface PokemonSpeciesDetail {
  rate: number;
  pokemon_species: RequiredForEvolution;
}

export interface RequiredForEvolution {
  name: string;
  url: string;
}