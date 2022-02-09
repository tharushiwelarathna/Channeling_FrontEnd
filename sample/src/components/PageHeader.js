import React from 'react'
import { Paper, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#CDDEFF'
    },
    pageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2)
    }
}))

export default function PageHeader(props) {

    const classes = useStyles();
    const { title } = props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
               
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h6"
                        component="div">
                        {title}</Typography>
                </div>
            </div>
        </Paper>
    )
}
