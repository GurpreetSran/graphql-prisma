import prisma from '../prisma';
import { Prisma } from 'prisma-binding';

enum mutations {
  CREATED,
  UPDATED,
  DELETED,
}

const Mutation = {
  async createUser(
    _parent: undefined,
    args: { data: { email: string; name: string } },
    ctx: { prisma: any },
    info: any
  ) {
    const { prisma } = ctx;
    const emailTaken = await prisma.exists.User({ email: args.data.email });

    if (emailTaken) {
      throw new Error('Email taken');
    }

    return prisma.mutation.createUser(
      {
        data: args.data,
      },
      info
    );
  },
  deleteUser(
    _parent: undefined,
    args: { id: string },
    { prisma }: { prisma: Prisma }
  ) {
    return prisma.mutation.deleteUser({
      where: {
        id: args.id,
      },
    });
  },
  updateUser(
    _parent: undefined,
    args: any,
    { prisma }: { prisma: Prisma },
    info: any
  ) {
    return prisma.mutation.updateUser(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
  createPost(
    _parent: undefined,
    args: any,
    { prisma }: { prisma: Prisma },
    info: any
  ) {
    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: true,
          author: {
            connect: {
              id: args.data.author,
            },
          },
        },
      },
      info
    );
  },

  deletePost(
    _parent: undefined,
    args: { id: string },
    ctx: { prisma: Prisma }
  ) {
    return ctx.prisma.mutation.deletePost({
      where: {
        id: args.id,
      },
    });
  },
  createComment(_parent: undefined, args: any, ctx: any, info: any) {
    return ctx.prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author,
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

  deleteComment(
    _parent: undefined,
    args: { id: string },
    ctx: { prisma: Prisma }
  ) {
    return ctx.prisma.mutation.deleteComment({
      where: {
        id: args.id,
      },
    });
  },
};

export default Mutation;
