import { PokemonCard } from '@/modules/pokemons-list/components/molecules';
import type { IPokemonCard } from '../PaginationView';
interface IAllPokemons {
  allPokemons: {
    totalCount: number;
    data: IPokemonCard[];
  };
}
const PokemonsListWrapper = ({ allPokemons }: IAllPokemons) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {allPokemons?.data.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonsListWrapper;
