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
    const [searchType, setSearchType] = useState('missionName');
    const [searchValue, setSearchValue] = useState('');

    function filterResults() {
        if (searchValue === '') {
            setPastLaunches(pastLaunches)
        }
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
                        // Searching when 'Enter' key is pressed
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