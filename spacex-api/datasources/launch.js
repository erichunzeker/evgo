const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.spacexdata.com/v3/';
    }

    async getPastLaunches() {
        const response = await this.get('launches/past');
        return Array.isArray(response)
            ? response.map(launch => this.launchReducer(launch))
            : [];
    }

    launchReducer(launch) {
        return {
            missionName: launch.mission_name,
            rocketName: launch.rocket.rocket_name,
            launchYear: launch.launch_year,
            videoLink: launch.links.video_link
        };
    }

}

module.exports = LaunchAPI;
