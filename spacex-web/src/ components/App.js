import '../styles/App.css';
import React, {useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LaunchTable from './LaunchTable'
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(8, 0, 8),
    },
    loading: {
        margin: theme.spacing(10),
        display: 'flex',
        justifyContent: 'center',
    },
    searchBar: {
        padding: theme.spacing(10, 0, 8)
    },
    launchTable: {
        padding: theme.spacing(0, 0, 8)
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
}));

const GET_LAUNCHES = gql`
    query GetPastLaunches {
      pastLaunches {
        missionName
        rocketName
        launchYear
        videoLink
      }
    }
`;


function App() {
    const classes = useStyles();

    // pastLaunches is the mutable list that the table will read from.
    // the search functionality will call 'setPastLaunches' while the 'data' variable
    // remains unchanged so that only 1 initial api call is needed
    const [pastLaunches, setPastLaunches] = useState([]);

    const {loading, data} = useQuery(GET_LAUNCHES, {
        onCompleted: (data) => {
            setPastLaunches(data.pastLaunches)
        }
    });

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
            >
                SpaceX Launch History
            </Typography>
            {data &&
                <Container maxWidth="lg" component="main" className={classes.searchBar}>
                    {/* pass hook to searchbar to allow this child component to alter the state that the table renders */}
                    <SearchBar setPastLaunches={setPastLaunches} pastLaunches={data.pastLaunches} />
                </Container>}
            {loading ?
                <LinearProgress className={classes.loading}/>
                :
                <Container maxWidth="lg" component="main" className={classes.launchTable}>
                    <LaunchTable pastLaunches={pastLaunches} />
                </Container>}
        </Container>
    );
}

export default App;
