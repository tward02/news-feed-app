import React from "react";
import {useFetchStories} from "../api/useFetchStories";

const Feed = () => {

    const {storiesLoading, storiesError, storiesData, storiesSuccess, storiesRefetch} = useFetchStories();

    return (
        <div>
            {storiesLoading ? "Loading..." : console.log(storiesData)}
        </div>
    )
}

export default Feed;