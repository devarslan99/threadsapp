import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { prisma } from './lib/db';

async function serverfunction() {
    const app = express();
    app.use(express.json());

    const server = new ApolloServer({
        typeDefs: `
  
          type Query{
              hello:String
              say(name:String):String
           }
         type Mutation{
          createUser(firstName:String!,lastName:String!,email:String!,password:String!):Boolean
  
         }
  `,
        resolvers: {

            Query: {
                hello: () => `Hi there i am a graphql server`,
                say: (_, { name }: { name: string }) => `Hi i am ${name}`
            },
            Mutation: {
                createUser: async (_, { firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
                    await prisma.user.create({
                     data:{
                       email,
                       firstName,
                       lastName,
                       password,
                       salt:'random-salt'
                    
                     }

                    })
                    return true
                }
            }
        },
    });

    await server.start();
    app.use('/graphql', expressMiddleware(server));
    app.listen(8000, () => `server started`)
}

serverfunction();