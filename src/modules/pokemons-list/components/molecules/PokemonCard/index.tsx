import { Link } from '@tanstack/react-router';
import { extractIdFromUrl, getSpriteUrl } from '@/modules/pokemons-list/utils';

interface IPokemon {
  pokemon: {
    name: string;
    url: string;
  };
}

const PokemonCard: React.FC<IPokemon> = ({ pokemon }) => {
  const { url, name } = pokemon;
  const pokemonId = extractIdFromUrl(url);
  const src = getSpriteUrl(pokemonId);
  return (
    <Link
      key={pokemonId}
      to="/pokemon/$id"
      params={{ id: String(pokemonId) }}
      className="group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2 cursor-pointer"
    >
      {/* Image */}
      <div className="w-full  p-4 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
        <img src={src} alt={name} loading="lazy" className="object-contain" />
      </div>

      <span className="text-xs text-gray-400 font-mono">
        #{String(pokemonId).padStart(3, '0')}
      </span>

      <h3 className="text-sm font-semibold text-gray-700 capitalize text-center">
        {pokemon.name}
      </h3>
    </Link>
  );
};

export default PokemonCard;
