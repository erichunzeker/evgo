import React from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    table: {
        minWidth: 400,
    }
});

const columns = ['Mission Name', 'Rocket Name', 'Launch Year', 'Video Link']

function LaunchTable({pastLaunches}) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {columns.map(fieldName => (
                            <TableCell key={fieldName} align={fieldName === 'Mission Name' ? 'left' : 'right'}>
                                <Typography variant="h5" color="textPrimary">{fieldName}</Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pastLaunches.map((row) => (
                        <TableRow key={row.missionName}>
                            {Object.keys(row).map(fieldName => (
                                fieldName !== "__typename" &&
                                <TableCell key={fieldName} align={fieldName === 'missionName' ? 'left' : 'right'}>
                                    {fieldName === 'videoLink' ?
                                        <Typography variant="subtitle1" color="textPrimary"><a href={row[fieldName]} target="_blank" rel="noopener noreferrer">{row[fieldName]}</a></Typography>
                                        :
                                    <Typography variant="subtitle1" color="textPrimary">{row[fieldName]}</Typography>}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default LaunchTable;