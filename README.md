# Turbo Federation

This is a combination of official starter Turborepo, NextJs and Apollo Subgraph(federation) demo.

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a packages manager.
It is not only turbo charged with turbo but it also has integrated subgraph demo of Apollo.

Althought it is not a complete example with nice file names and integrated rover etc.
However I hope this could give you an insight to start building your own super Turbo Federated Graphql app.

It includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org) app
- `web`: another [Next.js](https://nextjs.org) app uses apollo gateway that combines all the subgraphs and serve them in one supergraph
- `accounts`: another [Next.js](https://nextjs.org) app uses apollo subgraph to create subgraphs for accounts
- `inventory`: another [Next.js](https://nextjs.org) app uses apollo subgraph to create subgraphs for inventory
- `products`: another [Next.js](https://nextjs.org) app uses apollo subgraph to create subgraphs for products
- `reviews`: another [Next.js](https://nextjs.org) app uses apollo subgraph to create subgraphs for reviews
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

## Setup

This repository is using (PNPM) package manager to manage your monorepo .

### Build

To build all apps and packages, run the following command:

```
cd turbo-federation
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd turbo-federation
pnpm run dev
```

to test everything is running perfectly try this query on localhost:3000/api/graphql

```
query Query {
  topProducts(first: 5) {
    inStock
    name
    price
    reviews {
      author {
        name
        username
      }
      body
    }
    shippingEstimate
    weight
  }
  me {
    name
    username
    reviews {
      product {
        name
      }
      body
    }
  }
}
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching (Beta) you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd turbo-federation
pnpx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
