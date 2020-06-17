import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

export default prisma;

// prisma.query.users(null, '{id name email}').then((data: any) => {
//   console.log(JSON.stringify(data));
// });

// const isCommentExists = async () => {
//   return await prisma.exists.Comment({
//     id: 'ckbhwe6zc01ai0865vkshz69w',
//     text: 'Making comments are fun!',
//   });
// };

// isCommentExists().then((result) => console.log(result));
