// Apollo Client setup — this connects our app to the Pokémon GraphQL API
// Think of this file as the "bridge" between our frontend and the data source.

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

// the API endpoint — can use an .env variable or default to the public Pokémon GraphQL
const uri =
  (import.meta as any).env?.VITE_GRAPHQL_ENDPOINT ||
  "https://graphql-pokemon2.vercel.app/";

// creating one shared Apollo Client instance that the whole app can use
export const client = new ApolloClient({
  // link = how Apollo connects to the API
  link: ApolloLink.from([
    new HttpLink({ uri }), // handles sending requests to the endpoint
  ]),

  // cache = where Apollo temporarily stores responses
  cache: new InMemoryCache({
    // typePolicies help Apollo understand how to merge data
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            // only use "first" argument (limit) as the cache key
            keyArgs: ["first"],

            // merge function lets us "load more" Pokémon and keep the existing ones
            merge(existing = [], incoming: any[]) {
              // combine old and new results into one array
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

// summary of what’s happening:
// 1. define the API endpoint
// 2. set up an Apollo link to send requests
// 3. configure the cache so “Load More” can append data instead of replacing it
// 4. export the client for the rest of the app to use (in <ApolloProvider />)
