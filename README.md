# Video Game Console Wars

Finally figure out who won the video game console wars, decade by decade!

## Getting Started

Install all the project's dependencies:

```
yarn
```

Then, start your local server with:

```
yarn dev
```

## Deployments

This app is powered by Vercel. Opening a PR will automatically trigger a preview deployment, and merging to `main` will trigger a production deployment.
The production deployment lives at:

## Things I'd do if I had more time

_or if I'd want this to be a production app_

- Add an "overview" graph at the bottom and allow scrubbing, instead of filtering by decades.
- Finish "by Genre" aggregation feature.
- Improve styling and response behavior.
- Fix layout shift when loading finishes.

- Write tests for the data manipulation stuff.
- Look into performance improvements.
- Definitely invest into a11y.
- generate supabase DB types with openapi-typescript.
- Optimize bundle size, making sure e.g. lodash is being tree-shaken, etc.

## Design decisions

- I opted to expose the video game sales data via a Next API endpoint, in case I needed to massage the data. When deployed to Vercel I can get caching for free, which should help speed up the API calls.
- I did some extra massaging to fit the chart library on the client-side, so the API endpoint remains agnostic of the chart library choice.
