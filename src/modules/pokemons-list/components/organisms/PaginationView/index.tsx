import {
  Pagination,
} from '@/modules/pokemons-list/components/molecules';
import { PokemonsListWrapper } from '@/modules/pokemons-list/components/organisms';

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
      <PokemonsListWrapper allPokemons={pokemonsData} />

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
