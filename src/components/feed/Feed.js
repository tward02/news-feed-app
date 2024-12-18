import React, {useEffect, useState} from "react";
import {useFetchStories} from "../../api/useFetchStories";
import classes from './Feed.module.css';
import Story from "../story/Story";
import {CircularProgress} from "@mui/material";
import {getCategories, getCountries} from "../../utility/utility";
import FilterList from "../feedMultiSelect/FilterList";

const Feed = () => {

    const [page, setPage] = useState(1);
    const [stories, setStories] = useState([]);
    const [regions, setRegions] = useState([]);
    const [categories, setCategories] = useState([]);
    const {
        storiesLoading,
        storiesError,
        storiesData,
        storiesSuccess,
        storiesRefetch
    } = useFetchStories(categories.map((item) => item.key), regions.map((item) => item.key), page);

    useEffect(() => {
        if (storiesSuccess && storiesData) {
            setStories(storiesData?.data);
        }
    }, [storiesData, storiesSuccess]);

    useEffect(() => {
        if (storiesError) {

        }
    }, [storiesError]);

    const getFeed = () => {
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
            ))
    }

    return (
        <div>
            <div className={classes.filter}>
                {getFeed()}
                <div>
                    <FilterList items={getCountries()} title={"Filter by Region"} onChange={(items) => setRegions(items)}/>
                    <FilterList items={getCategories()} title={"Filter by Category"} onChange={(items) => setCategories(items)}/>
                </div>
            </div>
        </div>
    );
};

export default Feed;

// TODO plan:
// filter buttons -> resets pages -> change filters to vertical lists to right/left of feed
// refresh button
// pages + selection buttons at bottom of page
// loading 3 stories as place holder
// description and snippet
