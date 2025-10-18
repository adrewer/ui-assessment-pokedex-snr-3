import { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";

// shape we use across the app for list items
export type PokemonListItem = {
  id: string;
  name: string;
  number: string;
  image: string;
  types: string[];
};

// graphql query for the list page
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
 * Fetch the first N Pokémon (client-side search/filter/sort happens in the list).
 * default is 151 to cover Gen 1.
 */
export const useGetPokemons = (first: number = 151) => {
  const { data, loading, error } = useQuery(GET_POKEMONS, {
    variables: { first },
  });

  // flatten the apollo data shape into a plain array for the UI
  const pokemons: PokemonListItem[] = useMemo(
    () => (data?.pokemons ?? []) as PokemonListItem[],
    [data]
  );

  // return a conventional shape: data/loading/error
  return { data: pokemons, loading, error };
};
