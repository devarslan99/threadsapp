import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';

async function serverfunction() {
    const app = express();
    app.use(express.json());

    const server = new ApolloServer({
        typeDefs: `
  
          type Query{
              hello:String
              say(name:String):String
           }
  
  `,
        resolvers: {

            Query:{
                hello:()=>`Hi there i am a graphql server`,
                say:(_,{name}:{name:string})=>`Hi i am ${name}`
            }
        },
    });

    await server.start();
    app.use('/graphql', expressMiddleware(server));
    app.listen(8000,()=>`server started`)
}

serverfunction();