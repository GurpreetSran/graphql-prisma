import getUserId from '../utils/getUserId';

const User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent: any, args: any, ctx: any, info: any) {
      const userId = getUserId(ctx.req, false);

      if (parent.id === userId) {
        return parent.email;
      }

      return null;
    },
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve(parent: any, args: any, ctx: any, info: any) {
      return ctx.prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id,
          },
        },
      });
    },
  },
};

export default User;
