module.exports = {
    Query: {
        pastLaunches: (_, __, { dataSources }) =>
            dataSources.launchAPI.getPastLaunches()
    }
};
