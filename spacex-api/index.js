const { ApolloServer, gql } = require('apollo-server');
const LaunchAPI = require('./datasources/launch');
const typeDefs = require('./typeDefs');
const axios = require('axios');

const resolvers = {
  Query: {
    pastLaunches: (_, __, { dataSources }) =>
        dataSources.launchAPI.getPastLaunches()
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
