import db from '../db';

const Query = {
  users(_parent: undefined, args: { query: String }, ctx: { db: typeof db }) {
    if (!args.query) {
      return ctx.db.users;
    }

    return [];
  },
  comments(_parent: undefined, args: undefined, ctx: { db: typeof db }) {
    return ctx.db.comments;
  },
  posts(_parent: undefined, args: undefined, ctx: { db: typeof db }) {
    return ctx.db.posts;
  },
  add(_parent: undefined, args: { numbers: [number] }) {
    if (!args.numbers.length) {
      return 0;
    }

    return args.numbers.reduce((accumulator, val) => accumulator + val);
  },
};

export default Query;
