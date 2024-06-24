import { ApolloServer } from '@apollo/server';
import { prisma } from '../lib/db';
import { User } from '../users';

async function creategraphqlserver(){
const server = new ApolloServer({
    typeDefs: `

      type Query{
      ${User.queries}
         
       }
     type Mutation{
     ${User.mutations}
     

     }
`,
    resolvers: {

        Query: {
            ...User.resolvers.queries,
            
        },
        Mutation: {
            ...User.resolvers.mutations,
            
        }
    },
});

await server.start();
return server
}

export default creategraphqlserver;