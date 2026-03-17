import { BASE_API_URL, MAX_POKEMON_COUNT } from "@/config/constants";
import type {
    PokemonListResponse,
    PokemonDetail,
    IPokemonCard,
} from "./pokemon.types";

// --- Pagination ---
export const fetchPokemonList = async (
  page: number
): Promise<{
  data: IPokemonCard[];
  totalCount: number;
}> => {
  const offset = page * MAX_POKEMON_COUNT;
  const response = await fetch(
    `${BASE_API_URL}/pokemon?limit=${MAX_POKEMON_COUNT}&offset=${offset}`
  );
  if (!response.ok) throw new Error("Failed to fetch Pokémon list");
  const json: PokemonListResponse = await response.json();
  return {
    data: json.results,
    totalCount: json.count,
  };
};

// --- Infinite Scroll ---
export const fetchInfinitePokemonList = async ({
  pageParam = 0,
}: {
  pageParam: number;
}): Promise<{
  data: IPokemonCard[];
  nextOffset: number | null;
  totalCount: number;
}> => {
  const response = await fetch(
    `${BASE_API_URL}/pokemon?limit=${MAX_POKEMON_COUNT}&offset=${pageParam}`
  );
  if (!response.ok) throw new Error("Failed to fetch Pokémon list");
  const json: PokemonListResponse = await response.json();
  const nextOffset = json.next ? pageParam + MAX_POKEMON_COUNT : null;
  return {
    data: json.results,
    nextOffset,
    totalCount: json.count,
  };
};

// --- Detail ---
export const fetchPokemonDetail = async (id: string): Promise<PokemonDetail> => {
  const response = await fetch(`${BASE_API_URL}/pokemon/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch Pokémon #${id}`);
  return response.json();
};