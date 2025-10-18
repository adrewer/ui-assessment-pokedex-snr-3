// Hook to grab details for a single Pokémon when the dialog opens.
// This runs a separate GraphQL query that pulls in more specific data
// like weight, height, type info, and stats for one Pokémon at a time.

import { gql, useQuery } from "@apollo/client";

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight { minimum maximum }
      height { minimum maximum }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

type Vars = { id?: string; name?: string };

export function useGetPokemon(variables: Vars) {
  const { data, loading, error, refetch } = useQuery(GET_POKEMON, { variables });
  return { data: data?.pokemon, loading, error, refetch };
}
