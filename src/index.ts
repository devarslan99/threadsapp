import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import creategraphqlserver from './graphql';


async function serverfunction() {
    const app = express();
    app.use(express.json());

    
    app.use('/graphql', expressMiddleware(await creategraphqlserver()));
    app.listen(8000, () => `server started`)
}

serverfunction();