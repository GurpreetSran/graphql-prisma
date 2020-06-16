import db from '../db';

const Comment = {
  author(parent: any, _args: undefined, ctx: { db: typeof db }) {
    return ctx.db.users.find((user) => user.id === parent.author);
  },
  post(parent: any, _args: undefined, ctx: { db: typeof db }) {
    return ctx.db.posts.find((post) => post.id === parent.post);
  },
};

export default Comment;
