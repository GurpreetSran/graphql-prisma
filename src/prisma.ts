import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

prisma.query.users({}, '{id name email}').then((data: any) => {
  console.log(data);
});
