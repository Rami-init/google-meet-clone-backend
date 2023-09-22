import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { createServer } from "http";

import bodyParser from "body-parser";
import cors from "cors";
import corsMiddleWare from "./config/corsOptions";
import { env } from "./config/environment";

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
  },
};

async function main() {
  const app = express();

  const httpServer = createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(cors({ ...corsMiddleWare }));
  app.use(bodyParser.json());
  app.use(expressMiddleware(server));
  httpServer.listen(env.PORT, () => {
    console.info(`🚀 Server ready at http://localhost:${env.PORT}`);
  });
}
main();
