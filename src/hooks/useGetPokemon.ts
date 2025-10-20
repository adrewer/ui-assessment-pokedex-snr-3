// Hook to fetch detailed data for a single Pokémon when the dialog opens.
// Uses a separate GraphQL query to retrieve stats, classification, and other metadata.

import { gql, useQuery } from "@apollo/client";

// GraphQL query to fetch detailed Pokémon info by ID or name
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

// Query variables: either ID or name is sufficient
type Vars = { id?: string; name?: string };

/**
 * Custom hook to fetch details for a single Pokémon.
 * Triggered when the modal opens via route state.
 * Returns loading state, error, and refetch method.
 */
export function useGetPokemon(variables: Vars) {
  const { data, loading, error, refetch } = useQuery(GET_POKEMON, { variables });

  return {
    data: data?.pokemon,
    loading,
    error,
    refetch,
  };
}
