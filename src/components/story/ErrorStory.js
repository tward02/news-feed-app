import React from 'react';
import classes from './Story.module.css';
import {Card, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import {Refresh} from "@mui/icons-material";

const ErrorStory = ({error, reloadFn}) => {

    const getErrorMessage = () => {
        if (error.status === 401 || error.status === 403) {
            return "You lack the authorisation or permissions necessary to view this content."
        } else if (error.status === 402) {
            return "You have reached your daily request limit."
        } else if (error.status === 500) {
            return "Server error, please try again later."
        } else {
            return "Something went wrong, please try again later. If issue persists, please contact administrator."
        }
    };

    return (
        <Card sx={{maxWidth: '95%'}} className={classes.story}>
            <CardHeader sx={{color: 'red'}} title={"Error Fetching Top Stories"}/>
            <CardContent>
                <Typography variant="body1" sx={{color: 'red', textAlign: 'left'}}>
                    {getErrorMessage()}
                </Typography>
            </CardContent>
            <IconButton onClick={() => reloadFn()}><Refresh/> Try Again</IconButton>
        </Card>
    );
};

export default ErrorStory;
