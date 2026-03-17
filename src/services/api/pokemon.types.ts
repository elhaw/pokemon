// --- Raw API Response Types ---
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}
export interface Ability {
  name: string;
  url: string;
}

export interface AbilityEntry {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: { name: string };
  }[];
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  abilities: AbilityEntry[];
  base_experience: number;
}

export interface IPokemonCard {
  name: string;
  url: string;
}
