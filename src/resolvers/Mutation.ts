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

  // deletePost(_parent: undefined, args: { id: string }, ctx: { db: typeof db }) {
  //   const postIndex = ctx.db.posts.findIndex((post) => post.id === args.id);

  //   if (postIndex === -1) {
  //     throw new Error('Post not found');
  //   }

  //   const deletedPost = ctx.db.posts.splice(postIndex, 1);

  //   ctx.db.comments = ctx.db.comments.filter(
  //     (comment) => comment.post !== args.id
  //   );

  //   return deletedPost[0];
  // },
  // createComment(_parent: undefined, args: any, ctx: any) {
  //   const newComment = {
  //     id: v1(),
  //     text: args.data.text,
  //     author: args.data.author,
  //     post: args.data.post,
  //   };

  //   ctx.db.comments.push(newComment);
  //   ctx.pubSub.publish(`comment ${args.data.post}`, { comment: newComment });
  //   return newComment;
  // },

  // deleteComment(
  //   _parent: undefined,
  //   args: { id: string },
  //   ctx: { db: typeof db }
  // ) {
  //   const commentIndex = ctx.db.comments.findIndex(
  //     (comment) => comment.id === args.id
  //   );

  //   if (commentIndex === -1) {
  //     throw new Error('Post not found');
  //   }

  //   const deletedComment = ctx.db.comments.splice(commentIndex, 1);

  //   return deletedComment[0];
  // },
};

export default Mutation;
