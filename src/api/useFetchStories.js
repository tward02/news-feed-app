import {useQuery} from "@tanstack/react-query";
import axios from "axios";

//retrieved from .env file
const baseUrl = process.env.REACT_APP_BASE_URL;
const token = process.env.REACT_APP_API_KEY;

const getTopStories = async (categories, regions, page) => {
    const response = await axios.get(baseUrl + 'news/top?api_token=' + token
        + (categories?.length > 0 ? "&categories=" + categories.join(',') : "")
        + (regions?.length > 0 ? "&locale=" + regions.join(',') : "")
        + "&page=" + page);
    return response?.data;
}

/**
 * Handles the api calls and states, including errors, loading and refetching the data with new parameters
 */
export const useFetchStories = (categories, regions, page) => {
    const {
        isLoading: storiesLoading,
        error: storiesError,
        data: storiesData,
        isSuccess: storiesSuccess,
        refetch: storiesRefetch,
        isRefetching: storiesRefetching,
        isRefetchError: refetchError
    } = useQuery({
        queryKey: ['stories'],
        retry: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        queryFn: async () => await getTopStories(categories, regions, page),
    });
    if (storiesData) {
        storiesData.timestamp = Date.now();
    }
    return {storiesLoading, storiesError, storiesData, storiesSuccess, storiesRefetch, storiesRefetching, refetchError};
}
