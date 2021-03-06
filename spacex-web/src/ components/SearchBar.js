import React, { useState } from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {
    Button,
    Input,
    MenuItem,
    Paper,
    Select
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    search: {
        flexGrow: 1,
        height: 42,
        padding: theme.spacing(0, 2),
        paddingLeft: 0,
        display: 'flex',
        alignItems: 'center'
    },
    searchIcon: {
        marginRight: theme.spacing(2),
        color: theme.palette.icon
    },
    searchInput: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
    },
    searchButton: {
        backgroundColor: theme.palette.common.white,
        height: 42,
        marginLeft: theme.spacing(2)
    },
    searchFilter: {
        backgroundColor: theme.palette.secondary,
        paddingLeft: theme.spacing(2),
        borderRight: `solid 1px lightgrey`,
    }
}));


function SearchBar({setPastLaunches, pastLaunches}) {
    const classes = useStyles();
    // user will change search type on dropdown, default search is set to search by mission name
    const [searchType, setSearchType] = useState('missionName');
    // searchValue variable is set by setSearchValue hook to keep track of input
    const [searchValue, setSearchValue] = useState('');

    function filterResults() {
        // if user searches empty string, reset data back to original from graphql response
        if (searchValue === '') {
            setPastLaunches(pastLaunches)
        }
        // filter pastLaunches array based on searchType - since the setPastLaunches hook is passed in through props,
        // the launch table will rerender it's data anytime the search filter changes the array
        else if (searchType !== 'launchYear') {
            let val = searchValue.toLowerCase();
            setPastLaunches(pastLaunches.filter(launch => launch[searchType].toLowerCase().includes(val)))
        } else {
            setPastLaunches(pastLaunches.filter(launch => launch[searchType] === parseInt(searchValue)))
        }
    };

    return (
        <div
            className={classes.root}
        >
            <Paper
                className={classes.search}
                elevation={1}
            >
                <Select
                    className={classes.searchFilter}
                    disableUnderline={true}
                    value={searchType}
                    name="searchType"
                    onChange={e => setSearchType(e.target.value)}
                >
                    <MenuItem value="missionName">Mission Name</MenuItem>
                    <MenuItem value="rocketName">Rocket Name</MenuItem>
                    <MenuItem value="launchYear">Launch Year</MenuItem>
                </Select>

                <Input
                    className={classes.searchInput}
                    disableUnderline
                    placeholder={"Search"}
                    onKeyDown={(e) => {
                        // handle search by pressing enter key
                        if (e.key === 'Enter') filterResults();
                    }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </Paper>
            <Button
                className={classes.searchButton}
                onClick={() => filterResults()}
                variant="contained"
                color="primary"
            >
                <Typography variant="subtitle2" color="textPrimary">Search</Typography>
            </Button>
        </div>
    );
}

export default SearchBar;