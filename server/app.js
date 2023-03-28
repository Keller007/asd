const { ApolloServer, gql } = require('apollo-server');
const { db } = require('./db');
const { resolvers } = require('./resolvers');
const { typeDefs } = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: db ,
});

server.listen().then(({ url }) => {
  console.log(`Start server at ${url}`);
});
