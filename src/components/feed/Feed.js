import React, {useEffect, useState} from "react";
import {useFetchStories} from "../../api/useFetchStories";
import classes from './Feed.module.css';
import Story from "../story/Story";
import {getCategories, getCountries} from "../../utility/utility";
import FilterList from "../feedMultiSelect/FilterList";
import LoadingStory from "../story/LoadingStory";
import {IconButton, Stack, Tooltip} from "@mui/material";
import {ArrowBack, ArrowForward, Clear, FilterAlt, Refresh} from "@mui/icons-material";
import ErrorStory from "../story/ErrorStory";

const Feed = () => {

    const [page, setPage] = useState(1);
    const [stories, setStories] = useState([]);
    const [regions, setRegions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [apply, setApply] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
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
            setPageLoading(false);
        }
    }, [storiesData, storiesSuccess]);

    useEffect(() => {
        if (storiesError) {
            setPageLoading(false);
        }
    }, [storiesError]);

    useEffect(() => {
        setPageLoading(true);
        storiesRefetch();
    }, [page, storiesRefetch, apply]);

    const resetFilters = () => {
        setRegions([]);
        setCategories([]);
        setApply(!apply);
        setPage(1);
    }

    const updateFeed = () => {
        setApply(!apply);
        setPage(1);
    }

    const displayNavButtons = !storiesLoading && !storiesError;

    const getNavButtons = () => {

        return (<>

                <IconButton disabled={page <= 1 || !displayNavButtons} className={classes.buttonLeft} color={"inherit"}
                            onClick={() => setPage(page - 1)}><ArrowBack/> Previous</IconButton>
                {"Page " + page}
                <IconButton disabled={!displayNavButtons} className={classes.buttonRight} color={"inherit"}
                            onClick={() => setPage(page + 1)}>Next <ArrowForward/></IconButton>
            </>
        )
    }

    return (
        <div>
            <Stack direction="column" spacing={1}>

                <div>
                    <Stack direction="row" spacing={2} className={classes.stack}>
                        <div>
                            <div className={classes.feed}>
                                {storiesError ? <ErrorStory error={storiesError} reloadFn={() => updateFeed()}/>: (storiesLoading || pageLoading) ? Array(3).fill(
                                    <LoadingStory/>) : stories.map((story) =>
                                    <Story
                                        key={story.uuid} story={story}/>)}
                            </div>
                            <div className={classes.buttons}>
                                {getNavButtons()}
                            </div>
                        </div>

                        <div className={classes.filter}>
                            <div>
                                <Tooltip title={"Apply filters"}><IconButton
                                    disabled={!displayNavButtons} onClick={() => updateFeed()}><FilterAlt/> Apply</IconButton></Tooltip>
                                <Tooltip title={"Refresh Feed"}><IconButton
                                    disabled={!displayNavButtons} onClick={() => updateFeed()}><Refresh/></IconButton></Tooltip>
                                <Tooltip title={"Clear Filters"}><IconButton
                                    disabled={!displayNavButtons} onClick={() => resetFilters()}><Clear/></IconButton></Tooltip>
                            </div>
                            <FilterList items={getCountries()} title={"Filter by Region"}
                                        onChange={(items) => setRegions(items)} selectedItems={regions}/>
                            <FilterList items={getCategories()} title={"Filter by Category"}
                                        onChange={(items) => setCategories(items)} selectedItems={categories}/>
                        </div>
                    </Stack>
                </div>
            </Stack>
        </div>
    );
};

export default Feed;

// TODO plan:
// description and snippet
// make accessible