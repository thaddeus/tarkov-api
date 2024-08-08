# Tarkov API (Escape from Tarkov) 💻

[![deploy](https://github.com/the-hideout/tarkov-data-api/actions/workflows/deploy.yml/badge.svg)](https://github.com/the-hideout/tarkov-data-api/actions/workflows/deploy.yml) [![test](https://github.com/the-hideout/tarkov-api/actions/workflows/test.yml/badge.svg)](https://github.com/the-hideout/tarkov-api/actions/workflows/test.yml) [![Discord](https://img.shields.io/discord/956236955815907388?color=7388DA&label=Discord)](https://discord.gg/XPAsKGHSzH)

This is the main API for [tarkov.dev](https://tarkov.dev), and was forked from kokarn's Tarkov Tools API.

It's a simple [GraphQL](https://graphql.org/) API running on [Cloudflare workers](https://workers.cloudflare.com/).

This API powers all of tarkov.dev and other notable projects as well:

- [stash](https://github.com/the-hideout/stash)
- [ratscanner](https://github.com/RatScanner/RatScanner)
- [errbot](https://github.com/GrantBirki/errbot)
- [thehideout](https://play.google.com/store/apps/details?id=com.austinhodak.thehideout&hl=en_US&gl=US)

## What is this? 💡

A community made GraphQL API for Escape from Tarkov

- 🆓 Free
- 🔨 Easy to use
- 📖 Open source
- 🧑‍🤝‍🧑 Community driven
- ⚡ Ultra fast
- ⏰ Data is constantly updated in real-time

## What can I do with this API? ⭐

- View the prices of items
- Get detailed ammo, armor, and weapon information
- Fetch flea market data
- View item weight, slots, etc
- Calculate barter and hideout profit
- Determine ergo, armor class, durability, etc for an item
- Fetch detailed quest information and unlocks
- View info about crafts and their requirements
- Find information about in-game bosses
- Detailed info on medicines, stims, and in-game healing
- So much more (it would take up this entire page to list everything 😸)

> This [API](https://api.tarkov.dev/) does almost everything you would ever want for EFT!

## API Playground 🎾

There is a GraphQL playground for you to use and test out

**Link:** [api.tarkov.dev/](https://api.tarkov.dev/)

Example Query:

```graphql
query {
  items {
      id
      name
      shortName
      wikiLink
      iconLink
      updated
  }
}
```

More examples can be found in our [graphql example docs](./docs/graphql-examples.md) 📚

> Even more examples can be found on our [api](https://tarkov.dev/api/) page on tarkov.dev (includes many programming languages too)

## Development 🔨

Prerequisites:

- Install [Wrangler](https://github.com/cloudflare/wrangler)
- Run `wrangler login` - (needed for k/v store and secrets)

You may want to create a .dev.vars file in the main project folder with the following values:

- CACHE_BASIC_AUTH (used for caching)
- HTTP_GRAPHQL_SERVER (the address to the dedicated graphql server; must be https and a domain - not an IP address)

Start the API server:

- Start the dev environment by running `npm run dev`
- Then open up the playground on [localhost:8787/___graphql](http://127.0.0.1:8787/___graphql)

## Deployment 🚀

If you wish to deploy locally and have permissions to do so, run the following command:

```bash
wrangler publish
```

> We don't do this often and generally use GitHub actions to do all of our deployments for us

## HTTP Server

There's also an http webserver in the /http folder. It can be run with `npm run dev` or `npm start`. To run locally, you need to set the following vars (for local testing, you can use an .env file in the /http folder):

- CLOUDFLARE_TOKEN (token must have permissions to read the KVs the API uses)
- CACHE_BASIC_AUTH (used for caching)
- ENVIRONMENT (either `production` or `dev`; determines which KVs are read)
- PORT (defaults to 8088)
- WORKERS (defaults to # of cpus - 1; determines how many worker threads are created to respond to requests)
