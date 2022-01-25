const { ApolloServer, gql } = require("apollo-server-micro");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const typeDefs = gql`
  type Query {
    me: User
  }
  type User @key(fields: "id") {
    id: ID!
    name: String
    username: String
  }
`;

const resolvers = {
  Query: {
    me() {
      return users[0];
    },
  },
  User: {
    __resolveReference(object) {
      return users.find((user) => user.id === object.id);
    },
  },
};

let subgraphSchema = buildSubgraphSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema: subgraphSchema,
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

const users = [
  {
    id: "1",
    name: "Ada Lovelace",
    birthDate: "1815-12-10",
    username: "@ada",
  },
  {
    id: "2",
    name: "Alan Turing",
    birthDate: "1912-06-23",
    username: "@complete",
  },
];

export const config = {
  api: {
    bodyParser: false,
  },
};
