import { GraphQLServer } from 'graphql-yoga';
import prisma from './prisma';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { resolvers } from './resolvers/index';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(req: ContextParameters) {
    return {
      prisma,
      req,
    };
  },
});

server.start(() => console.log('Server is up'));
