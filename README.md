# Video Game Console Wars

Finally figure out who won the video game console wars, decade by decade! https://video-games-six.vercel.app/

## Getting Started

Install all the project's dependencies:

```
yarn
```

Then, start your local server with:

```
yarn dev
```

The app will be available on http://localhost:3000!

## Deployments

This app is powered by Vercel. Opening a PR will automatically trigger a preview deployment, and merging to `main` will trigger a production deployment.
The production deployment lives at: https://video-games-six.vercel.app/

## Things I'd do if I had more time

_or if I'd want this to be a production app_

- Add an "overview" graph at the bottom and allow scrubbing, instead of filtering by decades.
- Finish "by Genre" aggregation feature.
- Improve styling and response behavior.
- Fix layout shift when loading finishes.
- Improve graph labels
- Maybe add a fun auto-generated conclusion like "Looks like X company won the browser wars for these years!"

- Write tests for the data manipulation stuff.
- Look into performance improvements, especially in the data transformation logic.
- Definitely invest into a11y.
- generate supabase DB types with openapi-typescript.
- Optimize bundle size, making sure e.g. lodash is being tree-shaken, etc.
- Add CI/CD

## Design decisions

- I opted to expose the video game sales data via a Next API endpoint, in case I needed to massage the data. When deployed to Vercel I can get caching for free, which should help speed up the API calls.
- I did some extra massaging to fit the chart library on the client-side, so the API endpoint remains agnostic of the chart library choice.
- Data was imported and stored into Supabase, mostly because I wanted an excuse to play around with Supabase, but also so I didn't have to to parsing of a .csv file by hand.
- I used a `.env.development` file to populate Supabase's URL and Client keys, since those are non-sensitive and this should speed up running the project locally after cloning. If this app ever needs write-access to Supabase, we would need a different client key. We wouldn't commit that one.
