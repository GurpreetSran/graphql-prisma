import db from '../db';

const Post = {
  author(parent: any, _args: undefined, ctx: { db: typeof db }) {
    return ctx.db.users.find((user) => user.id === parent.author);
  },
  comments(parent: any, _args: undefined, ctx: { db: typeof db }) {
    return ctx.db.comments.filter((comment) => comment.post === parent.id);
  },
};

export default Post;
