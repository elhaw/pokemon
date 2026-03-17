import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from '@tanstack/react-router';
import { PokemonsPage } from '@/modules/pokemons-list/pages';
import { PokemonDetails } from '@/modules/pokemon-details/page';

// Root Layout
const RootComponent = () => <Outlet />;

export const rootRoute = createRootRoute({
  component: RootComponent,
});

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PokemonsPage,
});

export const pokemonDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pokemon/$id',
  component: PokemonDetails,
});
const routeTree = rootRoute.addChildren([homeRoute, pokemonDetailRoute]);

export const router = createRouter({ routeTree });
