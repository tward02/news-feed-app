import React, {useEffect, useRef, useState} from "react";
import {useFetchStories} from "../../api/useFetchStories";
import classes from './Feed.module.css';
import Story from "../story/Story";
import {getCategories, getCountries} from "../../utility/utility";
import FilterList from "../filterList/FilterList";
import LoadingStory from "../story/LoadingStory";
import {Button, IconButton, Stack, Tooltip} from "@mui/material";
import {ArrowBack, ArrowForward, Clear, FilterAlt, Refresh} from "@mui/icons-material";
import ErrorStory from "../story/ErrorStory";

const Feed = () => {

    const [page, setPage] = useState(1);
    const [stories, setStories] = useState([]);
    const [regions, setRegions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [apply, setApply] = useState(false);
    const [filtersDirty, setFiltersDirty] = useState(false);
    const feedRef = useRef(null);
    const {
        storiesLoading,
        storiesError,
        storiesData,
        storiesSuccess,
        storiesRefetch,
        storiesRefetching,
        refetchError
    } = useFetchStories(categories.map((item) => item.key), regions.map((item) => item.key), page);

    useEffect(() => {
        if (storiesSuccess && storiesData) {
            setStories(storiesData?.data);
        }
    }, [storiesData, storiesSuccess]);

    useEffect(() => {
        storiesRefetch();
        if (feedRef.current) {
            feedRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [page, storiesRefetch, apply]);

    const resetFilters = () => {
        setRegions([]);
        setCategories([]);
        setApply(!apply);
        setPage(1);
    };

    const updateFeed = () => {
        setApply(!apply);
        setPage(1);
    };

    const displayNavButtons = !storiesLoading && !storiesError && !refetchError && !storiesRefetching;

    const getNavButtons = () => {

        return (
            <>
                <IconButton data-testid={"prevButton"} aria-label={"navigate to previous page, page " + (page - 1)}
                            disabled={page <= 1 || !displayNavButtons || stories.length === 0}
                            className={classes.buttonLeft} color={"inherit"}
                            onClick={() => setPage(page - 1)}><ArrowBack/> Prev</IconButton>
                <div data-testid={"pageNumber"} className={classes.pageNumber}>{"Page " + page}</div>
                <IconButton data-testid={"nextButton"} aria-label={"navigate to next page, page " + (page + 1)}
                            disabled={!displayNavButtons || stories.length === 0}
                            className={classes.buttonRight} color={"inherit"}
                            onClick={() => setPage(page + 1)}>Next <ArrowForward/></IconButton>
            </>
        );
    };

    return (
        <div role={"main"}>
            <Stack direction="column" spacing={1}>
                <div>
                    <Stack direction="row" spacing={2} className={classes.stack}>
                        <div>
                            <div id={"storyFeed"} ref={feedRef} className={classes.feed}>
                                {storiesError || refetchError ? <ErrorStory error={storiesError}
                                                                            reloadFn={() => updateFeed()}
                                                                            title={"Error Fetching Top Stories"}/> : (storiesLoading || storiesRefetching) ? Array(3).fill(
                                    <LoadingStory/>) : (stories.length === 0) ?
                                    <ErrorStory error={{status: -1}} reloadFn={() => updateFeed()}
                                                title={"No Results"}/> : stories.map((story) =>
                                        <Story key={story.uuid} story={story}/>)}
                            </div>
                            <div className={classes.buttons}>
                                {getNavButtons()}
                            </div>
                        </div>

                        <div className={classes.filter}>
                            <div>
                                <Tooltip title={"Apply Filters"}><span><Button
                                    data-testid={"applyFiltersButton"} variant={"contained"}
                                    disabled={!displayNavButtons || !filtersDirty}
                                    onClick={() => {
                                        setFiltersDirty(false);
                                        updateFeed();
                                    }}
                                    startIcon={<FilterAlt/>}>Apply</Button></span></Tooltip>
                                <Tooltip title={"Refresh Feed"}><span><IconButton data-testid={"refreshButton"}
                                                                                  disabled={!displayNavButtons}
                                                                                  onClick={() => updateFeed()}><Refresh/></IconButton></span></Tooltip>
                                <Tooltip title={"Clear Filters"}><span><IconButton data-testid={"clearFiltersButton"}
                                                                                   disabled={!displayNavButtons}
                                                                                   onClick={() => resetFilters()}><Clear/></IconButton></span></Tooltip>
                            </div>
                            <FilterList items={getCountries()} title={"Filter by Region"}
                                        onChange={(items) => {
                                            setRegions(items);
                                            setFiltersDirty(true);
                                        }} selectedItems={regions}/>
                            <FilterList items={getCategories()} title={"Filter by Category"}
                                        onChange={(items) => {
                                            setCategories(items);
                                            setFiltersDirty(true);
                                        }} selectedItems={categories}/>
                        </div>
                    </Stack>
                </div>
            </Stack>
        </div>
    );
};

export default Feed;
