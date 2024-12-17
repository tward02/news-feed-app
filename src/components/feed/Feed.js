import React, {useEffect, useState} from "react";
import {useFetchStories} from "../../api/useFetchStories";
import classes from './Feed.module.css';
import Story from "../story/Story";
import {CircularProgress} from "@mui/material";

const Feed = () => {

    const [stories, setStories] = useState([]);
    const {storiesLoading, storiesError, storiesData, storiesSuccess, storiesRefetch} = useFetchStories();

    useEffect(() => {
        if (storiesSuccess && storiesData) {
            setStories(storiesData?.data);
        }
    }, [storiesData, storiesSuccess]);

    useEffect(() => {
        if (storiesError) {

        }
    }, [storiesError]);

    return (
        storiesLoading ? (
            <div className={classes.loading}>
                <CircularProgress/>
                <div>Loading Feed</div>
            </div>
        ) : (
            <div className={classes.feed}>
                {stories.map((story) => <Story key={story.uuid} story={story}/>)}
            </div>
        )
    );
};

export default Feed;

// TODO plan:
// jump to top button
// filter button
// refresh button
// infinite scroll
// description and snippet
