import { Prisma } from 'prisma-binding';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import getUserId from '../utils/getUserId';
import { ContextParameters } from 'graphql-yoga/dist/types';
import prisma from '../prisma';
import getToken from '../utils/generateToken';

enum mutations {
  CREATED,
  UPDATED,
  DELETED,
}

const Mutation = {
  async login(
    _parent: undefined,
    args: { email: string; password: string },
    ctx: { prisma: Prisma },
    info: any
  ) {
    const user = await ctx.prisma.query.user({
      where: {
        email: args.email,
      },
    });

    if (!user) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(args.password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    return {
      user,
      token: getToken(user.id),
    };
  },
  async createUser(
    _parent: undefined,
    args: { data: { email: string; name: string; password: string } },
    ctx: { prisma: Prisma },
    info: any
  ) {
    const { password } = args.data;

    if (password.length < 8) {
      throw new Error('Password must be 8 chars long');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const { prisma } = ctx;
    const emailTaken = await prisma.exists.User({ email: args.data.email });

    if (emailTaken) {
      throw new Error('Email taken');
    }

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password: encryptedPassword,
      },
    });

    return {
      user,
      token: getToken(user.id),
    };
  },
  deleteUser(
    _parent: undefined,
    args: { id: string },
    { prisma, req }: { prisma: Prisma; req: ContextParameters }
  ) {
    const userId = getUserId(req);

    return prisma.mutation.deleteUser({
      where: {
        id: userId,
      },
    });
  },
  updateUser(
    _parent: undefined,
    args: any,
    { prisma, req }: { prisma: Prisma; req: ContextParameters },
    info: any
  ) {
    const userId = getUserId(req);

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId,
        },
        data: args.data,
      },
      info
    );
  },
  createPost(
    _parent: undefined,
    args: any,
    { prisma, req }: { prisma: Prisma; req: ContextParameters },
    info: any
  ) {
    const userId = getUserId(req);

    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: true,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );
  },
  async deletePost(
    _parent: undefined,
    args: { id: string },
    ctx: { prisma: Prisma; req: ContextParameters }
  ) {
    const userId = getUserId(ctx.req);

    const postExists = await ctx.prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!postExists) {
      throw new Error('Unable to delete post');
    }

    return ctx.prisma.mutation.deletePost({
      where: {
        id: args.id,
      },
    });
  },
  async createComment(_parent: undefined, args: any, ctx: any, info: any) {
    const isPostPublished = await ctx.prisma.exists.Post({
      id: args.data.post,
      published: true,
    });

    if (!isPostPublished) {
      throw new Error('Post not published');
    }

    const userId = getUserId(ctx.req);

    return ctx.prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: args.data.post,
            },
          },
        },
      },
      info
    );
  },

  async deleteComment(
    _parent: undefined,
    args: { id: string },
    ctx: { req: ContextParameters; prisma: Prisma }
  ) {
    const userId = getUserId(ctx.req);

    const isOwner = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!isOwner) {
      throw new Error('Unable to delete comment');
    }

    return ctx.prisma.mutation.deleteComment({
      where: {
        id: args.id,
      },
    });
  },
};

export default Mutation;
