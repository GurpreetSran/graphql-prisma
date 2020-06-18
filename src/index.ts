import { GraphQLServer } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import Subscription from './resolvers/Subscription';
import prisma from './prisma';
import { ContextParameters } from 'graphql-yoga/dist/types';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context(req: ContextParameters) {
    return {
      prisma,
      req,
    };
  },
});

server.start(() => console.log('Server is up'));
