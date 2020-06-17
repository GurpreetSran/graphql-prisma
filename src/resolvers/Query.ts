const Query = {
  users(
    _parent: undefined,
    args: { query: String },
    ctx: { prisma: any },
    info: any
  ) {
    const opArgs: any = {};

    if (args.query) {
      opArgs.where = {
        OR: [{ name_contains: args.query }, { email_contains: args.query }],
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
  posts(_parent: undefined, args: any, ctx: any, info: any) {
    const opArgs: any = {};

    if (args.query) {
      opArgs.where = {
        OR: [{ title_contains: args.query }, { body_contains: args.query }],
      };
    }

    return ctx.prisma.query.posts(opArgs, info);
  },
};

export default Query;
