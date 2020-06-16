enum mutations {
  CREATED,
  UPDATED,
  DELETED,
}

import { v1 } from 'uuid';
import db from '../db';

const Mutation = {
  createUser(
    _parent: undefined,
    args: { data: { name: string } },
    ctx: { db: typeof db }
  ) {
    const newUser = {
      id: v1(),
      ...args.data,
    };
    ctx.db.users.push(newUser);
    return newUser;
  },
  deleteUser(_parent: undefined, args: { id: string }, ctx: { db: typeof db }) {
    const userIndex = ctx.db.users.findIndex((user) => user.id === args.id);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const deletedUser = ctx.db.users.splice(userIndex, 1);

    ctx.db.posts = ctx.db.posts.filter((post) => {
      const match = post.author === args.id;

      if (match) {
        ctx.db.comments = ctx.db.comments.filter(
          (comments) => comments.post !== post.id
        );
      }

      return !match;
    });

    ctx.db.comments = ctx.db.comments.filter(
      (comment) => comment.author !== args.id
    );

    return deletedUser[0];
  },
  createPost(
    _parent: undefined,
    args: { data: { title: string; author: string } },
    ctx: { db: typeof db; pubSub: any }
  ) {
    const newPost = {
      id: v1(),
      ...args.data,
    };
    ctx.pubSub.publish('post', {
      post: {
        mutation: mutations.CREATED,
        data: newPost,
      },
    });
    ctx.db.posts.push(newPost);
    return newPost;
  },
  deletePost(_parent: undefined, args: { id: string }, ctx: { db: typeof db }) {
    const postIndex = ctx.db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const deletedPost = ctx.db.posts.splice(postIndex, 1);

    ctx.db.comments = ctx.db.comments.filter(
      (comment) => comment.post !== args.id
    );

    return deletedPost[0];
  },
  createComment(_parent: undefined, args: any, ctx: any) {
    const newComment = {
      id: v1(),
      text: args.data.text,
      author: args.data.author,
      post: args.data.post,
    };

    ctx.db.comments.push(newComment);
    ctx.pubSub.publish(`comment ${args.data.post}`, { comment: newComment });
    return newComment;
  },

  deleteComment(
    _parent: undefined,
    args: { id: string },
    ctx: { db: typeof db }
  ) {
    const commentIndex = ctx.db.comments.findIndex(
      (comment) => comment.id === args.id
    );

    if (commentIndex === -1) {
      throw new Error('Post not found');
    }

    const deletedComment = ctx.db.comments.splice(commentIndex, 1);

    return deletedComment[0];
  },
};

export default Mutation;
