import 'dotenv/config';
import express from 'express';
import bodyParser from "body-parser"
import graphqlHTTP from "express-graphql";
import { schema, root } from "./src/graphql/index"

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//API = process.env.API
//app.use(`/${API}/home`,home)

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: process.env.GRAPHIQL === 'development',
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);