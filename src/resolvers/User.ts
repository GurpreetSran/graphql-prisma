import db from '../db';

const User = {
  posts(parent: any, _args: undefined, ctx: { db: typeof db }) {
    return ctx.db.posts.filter((post) => post.author === parent.id);
  },
  comments(parent: any, _args: undefined, ctx: { db: typeof db }) {
    return ctx.db.comments.filter((comment) => comment.author === parent.id);
  },
};

export default User;
