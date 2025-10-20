# ui-assessment-pokedex-snr-3
-----------------------------
# Pokédex App

A responsive Pokédex built with React, TypeScript, and GraphQL.

## Features

- Browse the first 151 Pokémon
- Filter by type
- Sort by name or number
- Toggle between grid and list views
- Search by name, number, or ID
- View detailed stats in a modal overlay

## Tech Stack

- React + TypeScript
- Apollo Client + GraphQL
- React Router
- JSS for styling
- Vite for build tooling

## Accessibility

- Keyboard navigation and Escape-to-close support
- ARIA labels on interactive elements
- Responsive layout for mobile and desktop

## Setup

```bash
npm install
npm run dev
```

GraphQL endpoint defaults to `https://graphql-pokemon2.vercel.app/`. You can override it with `VITE_GRAPHQL_ENDPOINT`.

## Deployment

This project is deployed via Netlify:  
[https://ava-pokedex-ui.netlify.app](https://ava-pokedex-ui.netlify.app)

## Notes

- Modal routing uses background state for smooth transitions
- Nav bar is collapsible and responsive
- All components are typed and commented for clarity

## License

MIT

