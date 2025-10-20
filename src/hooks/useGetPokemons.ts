import { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";

// Shared shape for Pokémon list items across the app
export type PokemonListItem = {
  id: string;
  name: string;
  number: string;
  image: string;
  types: string[];
};

// GraphQL query to fetch Pokémon list data
export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      image
      types
    }
  }
`;

/**
 * Custom hook to fetch a list of Pokémon.
 * Uses Apollo Client to query the GraphQL API.
 * Defaults to 1000 results to cover all generations.
 * Filtering and search are handled client-side.
 */
export const useGetPokemons = (first: number = 1000) => {
  const { data, loading, error } = useQuery(GET_POKEMONS, {
    variables: { first },
  });

  // Memoize and cast the result to the expected shape
  const pokemons: PokemonListItem[] = useMemo(
    () => (data?.pokemons ?? []) as PokemonListItem[],
    [data]
  );

  return { data: pokemons, loading, error };
};
