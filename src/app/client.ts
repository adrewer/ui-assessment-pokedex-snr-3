// Apollo Client setup — connects the app to the Pokémon GraphQL API
// Acts as the bridge between frontend and data source

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

// API endpoint — uses .env variable if available, otherwise defaults to public Pokémon GraphQL
const uri =
  (import.meta as any).env?.VITE_GRAPHQL_ENDPOINT ||
  "https://graphql-pokemon2.vercel.app/";

// Create a shared Apollo Client instance for the entire app
export const client = new ApolloClient({
  // Link defines how Apollo sends requests to the API
  link: ApolloLink.from([
    new HttpLink({ uri }), // Sends GraphQL queries to the endpoint
  ]),

  // Cache stores query results in memory for performance and pagination
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            // Use "first" argument as cache key
            keyArgs: ["first"],

            // Merge function enables "load more" behavior
            merge(existing = [], incoming: any[]) {
              return [...existing, ...incoming]; // Append new results
            },
          },
        },
      },
    },
  }),
});

/**
 * Summary:
 * 1. Define the GraphQL endpoint
 * 2. Set up Apollo link to send requests
 * 3. Configure cache to support pagination
 * 4. Export the client for use in <ApolloProvider />
 */
