import { GraphQLServer, PubSub } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { ContextParameters } from "graphql-yoga/dist/types";

import * as Query from "./resolvers/Query";
import * as Mutation from "./resolvers/Mutation";
import * as Subscription from "./resolvers/Subscription";
import * as User from "./resolvers/User";
import * as Link from "./resolvers/Link";
import * as Vote from "./resolvers/Vote";

export type ILink = {
  id: string;
  url: string;
  description: string;
};

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const prisma = new PrismaClient();

const pubsub = new PubSub();

export interface IContext extends ContextParameters {
  prisma: typeof prisma;
  pubsub: typeof pubsub;
}

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request): IContext => ({
    ...request,
    prisma,
    pubsub,
  }),
});

server.start(() => console.log(`Server is running on 4000`));
