import {
  Pagination,
  PokemonCard,
} from '@/modules/pokemons-list/components/molecules';

export interface IPokemonCard {
  name: string;
  url: string;
}
type PaginationViewProps = {
  pokemonsData: {
    data: IPokemonCard[];
    totalCount: number;
  };
  page: number;
  totalPages: number;
  pokemonsCountPerPage: number;
  setPage: (page: number) => void;
};

const PaginationView = ({
  pokemonsData,
  page,
  totalPages,
  pokemonsCountPerPage,
  setPage,
}: PaginationViewProps) => {
  return (
    <article>
      <div className="grid grid-cols-4 gap-4">
        {pokemonsData?.data.map((pokemon) => {
          return <PokemonCard pokemon={pokemon} />;
        })}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        limit={pokemonsCountPerPage}
        onPageChange={(page: number) => setPage(page)}
      />
    </article>
  );
};

export default PaginationView;
