#download & install instructions:

- git clone https://github.com/erichunzeker/evgo.git
- cd evgo

### installing and running graphql api
- cd spacex-api && npm install
- node index.js (start apollo server on localhost:4000/graphql)

### installing and running react app
- cd spacex-web && npm install (new terminal window/tab) 
- npm start (start react app on localhost:3000/)

### graphql api
- query: pastLaunches
- returns a list of all past launches in the format:

```
{
    missionName
    rocketName
    launchYear
    videoLink  
}
```

- I chose to use a 1 dimensional format because of the small amount of data being returned in each launch. 
Had there been multiple videos to reference, various information about the rockets, or extensive data specific to each mission, I 
would've nested the information within the return.
- I also only implemented one graphql endpoint because the app was only displaying the set or subset of data returned by this single query.
If I were to build another view that included more information on each individual launch, I would've added another endpoint called launchById. 
 