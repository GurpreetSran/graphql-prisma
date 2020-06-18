import { Prisma } from 'prisma-binding';

const Subscription = {
  comment: {
    subscribe(
      _parent: undefined,
      { postId }: { postId: string },
      ctx: { prisma: Prisma },
      info: any
    ) {
      return ctx.prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId,
              },
            },
          },
        },
        info
      );
    },
  },

  post: {
    subscribe(
      _parent: undefined,
      _args: undefined,
      ctx: { prisma: Prisma },
      info: any
    ) {
      return ctx.prisma.subscription.post(
        {
          where: {
            node: {
              published: true,
            },
          },
        },
        info
      );
    },
  },
};

export default Subscription;
