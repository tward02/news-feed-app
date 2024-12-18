import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const token = process.env.REACT_APP_API_KEY;

const getTopStories = async (categories, regions, page) => {
    const response = await axios.get(baseUrl + 'news/top?api_token=' + token
                                                        + (categories?.length > 0 ? "&categories=" + categories.join(',') : "")
                                                        + (regions?.length > 0 ? "&locale=" + regions.join(',') : "")
                                                        + "&page=" + page);
    return response?.data;
}

export const useFetchStories = (categories, regions, page) => {
    const {
        isLoading: storiesLoading,
        error: storiesError,
        data: storiesData,
        isSuccess: storiesSuccess,
        refetch: storiesRefetch
    } = useQuery({
        queryKey: ['stories'],
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: async () => await getTopStories(categories, regions, page),
    });
    return {storiesLoading, storiesError, storiesData, storiesSuccess, storiesRefetch};
}
