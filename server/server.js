const express = require('express');

//import ApolloServer
const { ApolloServer } = require('apollo-server-express');

//import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// creates a new Apollo server and passes in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Creates a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
// integrates our Apollo server with the Express application as middleware
server.applyMiddleware({ app });


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);