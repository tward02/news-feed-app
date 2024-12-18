import React, {useEffect, useState} from "react";
import {useFetchStories} from "../../api/useFetchStories";
import classes from './Feed.module.css';
import Story from "../story/Story";
import {getCategories, getCountries} from "../../utility/utility";
import FilterList from "../feedMultiSelect/FilterList";
import LoadingStory from "../story/LoadingStory";

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

    return (
        <div>
            <div className={classes.filter}>
                <div className={classes.feed}>
                    {storiesLoading ? Array(3).fill(<LoadingStory/>) : stories.map((story) => <Story key={story.uuid} story={story}/>)}
                </div>
                <div>
                    <FilterList items={getCountries()} title={"Filter by Region"}
                                onChange={(items) => setRegions(items)}/>
                    <FilterList items={getCategories()} title={"Filter by Category"}
                                onChange={(items) => setCategories(items)}/>
                </div>
            </div>
        </div>
    );
};

export default Feed;

// TODO plan:
// filter buttons -> resets pages
// refresh button
// pages + selection buttons at bottom of page
// description and snippet
