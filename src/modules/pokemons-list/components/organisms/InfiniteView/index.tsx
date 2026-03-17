// src/modules/pokemons-list/components/organisms/InfiniteView/index.tsx

import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Spinner } from '@/modules/shared/components/atoms';
import { fetchInfinitePokemonList } from '@/services/api/pokemon.api';
import { PokemonsListWrapper } from '@/modules/pokemons-list/components/organisms';

interface IPokemon {
  url: string;
  name: string;
}

const InfiniteView = () => {
  const loaderRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemon', 'infinite'],
    queryFn: fetchInfinitePokemonList,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
  });
  const allPokemons: IPokemon[] = data?.pages.flatMap((p) => p.data) ?? [];
  const pokemons = {
    data: allPokemons,
    totalCount: data?.pages[0]?.totalCount as number,
  };
  const totalCount = data?.pages[0]?.totalCount ?? 0;
  const allPokemonsLoaded = !hasNextPage && allPokemons.length > 0;
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading)
    return <Spinner size="sm" message="Loading more Pokémons..." />;

  if (isError) return 'error';

  return (
    <article className="space-y-6">
      <PokemonsListWrapper allPokemons={pokemons} />
      {isFetchingNextPage && (
        <div className="w-full flex flex-col items-center gap-2 py-8">
          <Spinner size="md" />
          <p className="text-sm text-gray-400">Loading more Pokémons...</p>
        </div>
      )}

      <div ref={loaderRef} className="w-full h-4" />

      {allPokemonsLoaded && (
        <div className="text-center py-6 space-y-1">
          <p className="text-2xl">🎉</p>
          <p className="text-gray-500 font-medium">You've caught them all!</p>
          <p className="text-gray-400 text-sm">
            All {allPokemons.length} of {totalCount} Pokémon loaded
          </p>
        </div>
      )}
    </article>
  );
};

export default InfiniteView;
