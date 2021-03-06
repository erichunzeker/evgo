const { gql } = require('apollo-server');

const typeDefs = gql`

  type Launch {
    missionName: String
    rocketName: String
    launchYear: Int
    videoLink: String
  }

  type Query {
    pastLaunches: [Launch]
  }
`;

module.exports = typeDefs;

