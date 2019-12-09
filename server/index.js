import 'dotenv/config';
import express from 'express';
import graphqlHTTP from "express-graphql";
import { schema, root } from "./graphql/index"

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);