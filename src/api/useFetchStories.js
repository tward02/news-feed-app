import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const token = process.env.REACT_APP_API_KEY;

const getTopStories = async () => {
    const response = await axios.get(baseUrl + 'news/top?api_token=' + token);
    return response?.data;
}

export const useFetchStories = () => {
    const {
        isLoading: storiesLoading,
        error: storiesError,
        data: storiesData,
        isSuccess: storiesSuccess,
        refetch: storiesRefetch
    } = useQuery({
        queryKey: ['stories'],
        retry: false,
        queryFn: async () => await getTopStories()
    });
    return {storiesLoading, storiesError, storiesData, storiesSuccess, storiesRefetch};
}
