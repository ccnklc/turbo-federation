const { ApolloServer } = require("apollo-server-micro");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  // This entire `serviceList` is optional when running in managed federation
  // mode, using Apollo Graph Manager as the source of truth.  In production,
  // using a single source of truth to compose a schema is recommended and
  // prevents composition failures at runtime using schema validation using
  // real usage-based metrics.

  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: "accounts",
        url: process.env.ACCOUNTS_GRAPHQL_ENDPOINT,
      },
      {
        name: "reviews",
        url: process.env.REVIEWS_GRAPHQL_ENDPOINT,
      },
      {
        name: "products",
        url: process.env.PRODUCTS_GRAPHQL_ENDPOINT,
      },
      {
        name: "inventory",
        url: process.env.INVENTORY_GRAPHQL_ENDPOINT,
      },
      // ...additional subgraphs...
    ],
  }),
});

const apolloServer = new ApolloServer({
  gateway,

  // Apollo Graph Manager (previously known as Apollo Engine)
  // When enabled and an `ENGINE_API_KEY` is set in the environment,
  // provides metrics, schema management and trace reporting.
  engine: false,

  // Subscriptions are unsupported but planned for a future Gateway version.
  subscriptions: false,
  introspection: true,
});

const startServer = apolloServer.start();

const exportableStartServer = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};

export default exportableStartServer;

export const config = {
  api: {
    bodyParser: false,
  },
};
