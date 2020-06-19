export { GraphQLServer } from 'graphql-yoga';

declare module 'graphql-yoga' {
  export interface GraphQLServer {
    constructor(props: object);
  }

  export default GraphQLServer;
}
