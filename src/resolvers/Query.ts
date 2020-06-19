import getUserId from '../utils/getUserId';
import prisma from '../prisma';

const Query = {
  users(_parent: undefined, args: any, ctx: { prisma: any }, info: any) {
    const opArgs: any = {
      first: args.first,
      skip: args.skip,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        OR: [{ name_contains: args.query }],
      };
    }

    return ctx.prisma.query.users(opArgs, info);
  },
  comments(
    _parent: undefined,
    args: undefined,
    ctx: { prisma: any },
    info: any
  ) {
    return ctx.prisma.query.comments(null, info);
  },
  async myPosts(_parent: undefined, args: any, ctx: any, info: any) {
    const userId = await getUserId(ctx.req);

    return await ctx.prisma.query.posts(
      {
        where: {
          author: {
            id: userId,
          },
        },
      },
      info
    );
  },
  posts(_parent: undefined, args: any, ctx: any, info: any) {
    const opArgs: any = {
      where: {
        published: true,
      },
    };

    if (args.query) {
      opArgs.where.OR = [
        { title_contains: args.query },
        { body_contains: args.query },
      ];
    }

    return ctx.prisma.query.posts(opArgs, info);
  },
  async post(_parent: undefined, args: { id: string }, ctx: any, info: any) {
    const userId = getUserId(ctx.req, false);
    const [post] = await prisma.query.posts(
      {
        where: {
          id: args.id,
          OR: [
            {
              published: true,
            },
            {
              author: {
                id: userId,
              },
            },
          ],
        },
      },
      info
    );

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  },
  async me(_parent: undefined, args: any, ctx: any, info: any) {
    const userId = await getUserId(ctx.req);

    return ctx.prisma.query.user({
      where: {
        id: userId,
      },
    });
  },
};

export default Query;
