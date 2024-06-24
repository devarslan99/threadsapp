import { prisma } from '../lib/db';
const queries={
    hello: () => `Hi there i am a graphql server`,
            say: (_:any, { name }: { name: string }) => `Hi i am ${name}`
};
const mutations={
    createUser: async ( _:any, { firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
        await prisma.user.create({
         data:{
           email,
           firstName,
           lastName,
           password,
           salt:'random-salt'
        
         }

        })
        return 'true'
    }
};

export const resolvers={queries,mutations}