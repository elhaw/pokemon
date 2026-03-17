import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchPokemonDetail, fetchInfinitePokemonList } from "@services/api/pokemon.api";

export const usePokemonList = (page: number) =>
  useQuery({
    queryKey: ["pokemon-list", page],
    queryFn: () => fetchPokemonList(page),
  });

export const usePokemonDetail = (id: string) =>
  useQuery({
    queryKey: ["pokemon-detail", id],
    queryFn: () => fetchPokemonDetail(id),
  });

export const useInfinitePokemon = () =>
  useInfiniteQuery({
    queryKey: ["pokemon-infinite"],
    queryFn: fetchInfinitePokemonList,
    initialPageParam: 0,                             
    getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
  });