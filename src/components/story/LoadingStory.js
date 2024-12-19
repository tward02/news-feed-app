import React from 'react';
import {Card, CardContent} from "@mui/material";
import classes from "./Story.module.css";
import ContentLoader from "react-content-loader";

const LoadingStory = () => {

    return (
        <Card id={"loading.story"} sx={{maxWidth: '95%'}} className={classes.story}>
            <CardContent id={"loading.content"}>
                <ContentLoader
                    speed={2}
                    viewBox="0 0 400 300"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="8" y="-13" rx="2" ry="2" width="400" height="37"/>
                    <rect x="85" y="34" rx="2" ry="2" width="230" height="16"/>
                    <rect x="0" y="60" rx="2" ry="2" width="400" height="188"/>
                    <rect x="-3" y="267" rx="2" ry="2" width="400" height="37"/>
                </ContentLoader>
            </CardContent>
        </Card>
    );
};

export default LoadingStory;
