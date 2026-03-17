import { useNavigate, useParams } from '@tanstack/react-router';
import {
  StatBar,
  TypeBadge,
} from '@/modules/pokemon-details/components/molecules';
import { DetailSkeleton } from '@/modules/pokemon-details/components/organisms';
import { usePokemonDetail } from '@/hooks/usePokemon';
import {
  formatHeight,
  formatId,
  formatWeight,
} from '@/modules/pokemon-details/utils';

const statNameMap: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};

// --- Interfaces ---

interface Stat {
  stat: { name: string };
  base_stat: number;
}

interface Ability {
  ability: { name: string };
  is_hidden: boolean;
}

interface BaseStatsProps {
  stats: Stat[];
  statNameMap: Record<string, string>;
}

interface AbilitiesProps {
  abilities: Ability[];
}

interface BaseExperienceProps {
  baseExperience: number;
}

interface PokemonHeaderProps {
  name: string;
  id: number;
}

const PokemonHeader = ({ name, id }: PokemonHeaderProps) => {
  return (
    <div className="bg-linear-to-r from-purple-500 to-pink-500 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white capitalize">⚡ {name}</h1>
      <p className="text-purple-200 mt-1 text-sm">{formatId(id)}</p>
    </div>
  );
};

// --- Components ---

const BaseStats = ({ stats, statNameMap }: BaseStatsProps) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-3">Base Stats</h2>
      <div className="flex flex-col gap-3">
        {stats.map((s) => (
          <StatBar
            key={s.stat.name}
            name={statNameMap[s.stat.name] ?? s.stat.name}
            value={s.base_stat}
          />
        ))}
      </div>
    </div>
  );
};

const Abilities = ({ abilities }: AbilitiesProps) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-3">Abilities</h2>
      <div className="flex flex-col gap-2">
        {abilities.map((a) => (
          <div key={a.ability.name} className="flex items-center gap-2">
            <span className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-700 capitalize">
              {a.ability.name}
            </span>
            {a.is_hidden && (
              <span className="text-xs text-gray-400">(Hidden)</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const BaseExperience = ({ baseExperience }: BaseExperienceProps) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900">Base Experience</h2>
      <p className="text-2xl font-bold text-purple-500 mt-1">
        {baseExperience} XP
      </p>
    </div>
  );
};
interface InfoCardProps {
  icon: string;
  label: string;
  value: string;
}

const InfoCard = ({ icon, label, value }: InfoCardProps) => {
  return (
    <div className="border border-gray-100 rounded-xl p-3 flex flex-col items-center">
      <span className="text-xs text-gray-400 mb-1">
        {icon} {label}
      </span>
      <span className="text-lg font-bold text-gray-800">{value}</span>
    </div>
  );
};

interface PokemonAvatarProps {
  sprite: string;
  name: string;
}

const PokemonAvatar = ({ sprite, name }: PokemonAvatarProps) => {
  return (
    <div className="bg-gray-100 rounded-full w-56 h-56 flex items-center justify-center">
      <img src={sprite} alt={name} className="w-48 h-48 object-contain" />
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────
const PokemonsDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });

  const { data: pokemon, isLoading, isError } = usePokemonDetail(id);

  if (isLoading) return <DetailSkeleton />;

  if (isError)
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <p className="text-red-500">⚠️ Something went wrong</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate({ to: '/' })}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 mb-6"
      >
        ← Back to List
      </button>

      {/* Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm">
        <PokemonHeader name={pokemon?.name ?? ''} id={pokemon?.id ?? 0} />
        <div className="grid grid-cols-2 gap-8 p-8">
          <div className="flex flex-col items-center gap-4">
            <PokemonAvatar
              sprite={pokemon?.sprites.front_default ?? ''}
              name={pokemon?.name ?? ''}
            />

            <div className="flex gap-2">
              {pokemon?.types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} />
              ))}
            </div>

            <div className="grid grid-cols-2 w-full gap-3 mt-2">
              <InfoCard
                icon="🏷"
                label="Height"
                value={formatHeight(pokemon!.height)}
              />
              <InfoCard
                icon="⚖"
                label="Weight"
                value={formatWeight(pokemon!.weight)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <BaseStats stats={pokemon?.stats ?? []} statNameMap={statNameMap} />
            <Abilities abilities={pokemon?.abilities ?? []} />
            <BaseExperience baseExperience={pokemon?.base_experience ?? 0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonsDetails;
