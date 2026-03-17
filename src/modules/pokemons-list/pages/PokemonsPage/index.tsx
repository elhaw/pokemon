import { useState } from 'react';
import classNames from 'classnames';
import { usePokemonList } from '@/hooks/usePokemon';
import {
  PokemonCardSkeleton,
  PaginationController,
} from '@/modules/pokemons-list/components/molecules';
import { MAX_POKEMON_COUNT } from '@/config/constants';
import {
  PaginationView,
  InfiniteView,
} from '@/modules/pokemons-list/components/organisms';

type ViewMode = 'pagination' | 'infinite';

const HomePage = () => {
  const [page, setPage] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('pagination');
  const { data, isLoading, isError } = usePokemonList(page);
  const totalPages = Math.ceil((data?.totalCount ?? 0) / MAX_POKEMON_COUNT);

  if (isLoading)
    return (
      <div className="container m-auto">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <PokemonCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        <p>⚠️ Something went wrong</p>
      </div>
    );

  return (
    <article
      className={classNames('py-16', {
        'bg-blue-50': viewMode === 'pagination',
        'bg-green-300': viewMode === 'infinite',
      })}
    >
      <div className="container m-auto">
        <div>
          <PaginationController
            onViewChange={setViewMode}
            viewMode={viewMode}
          />
        </div>
        {viewMode === 'pagination' ? (
          <PaginationView
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            pokemonsData={data!}
            pokemonsCountPerPage={MAX_POKEMON_COUNT}
          />
        ) : (
          ''
        )}

        {viewMode === 'infinite' ? <InfiniteView /> : ''}
      </div>
    </article>
  );
};

export default HomePage;
