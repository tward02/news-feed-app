import '@testing-library/jest-dom'
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import Feed from "./Feed";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useFetchStories} from "../../api/useFetchStories";
import {getCategories, getCountries} from "../../utility/utility";

const storiesData = {
    "meta": {
        "found": 21517316,
        "returned": 3,
        "limit": 3,
        "page": 1
    },
    "data": [
        {
            "uuid": "75dd9bc9-b9da-4b74-b181-88432d465c65",
            "title": "Story 1",
            "description": "The Korean people, along with the rest of the world, rejoiced at the resilience of the country's democratic institutions and its enduring democratic spirit upon...",
            "keywords": "",
            "snippet": "Presidency seems weaker with more powers seized by National Assembly, but democracy must be improved\n\nBy Kim Ji-soo\n\nThe Korean people, along with the rest of t...",
            "url": "https:\/\/koreatimes.co.kr\/www\/nation\/2024\/12\/356_388780.html",
            "image_url": "https:\/\/img.koreatimes.co.kr\/upload\/thumbnailV2\/194f3bdfa2d14ab9bcb846036dbd1435.jpg",
            "language": "en",
            "published_at": "2024-12-19T20:05:05.000000Z",
            "source": "koreatimes.co.kr",
            "categories": [
                "general"
            ],
            "relevance_score": null,
            "locale": "kr"
        },
        {
            "uuid": "55922ff7-ce8b-4137-a3cb-e0962f1c1007",
            "title": "Story 2",
            "description": "At least 100 North Korean soldiers deployed to fight against Ukrainian forces in Russia's Kursk region have been killed, with nearly 1,000 reported injured, the...",
            "keywords": "",
            "snippet": "North Korean casualties surge due to inexperience with drones and combat\n\nBy Anna J. Park\n\nAt least 100 North Korean soldiers deployed to fight against Ukrainia...",
            "url": "https:\/\/koreatimes.co.kr\/www\/nation\/2024\/12\/103_388804.html",
            "image_url": "https:\/\/img.koreatimes.co.kr\/upload\/thumbnailV2\/46776720a2874d9d88c3fd5cacbcf906.jpg",
            "language": "en",
            "published_at": "2024-12-19T20:05:05.000000Z",
            "source": "koreatimes.co.kr",
            "categories": [
                "general"
            ],
            "relevance_score": null,
            "locale": "kr"
        },
        {
            "uuid": "88799ae5-02e6-4462-a8f5-2137c5bc29fe",
            "title": "Story 3",
            "description": "The United States is moving to designate Bitcoin as a strategic asset, raising expectations that this could intensify competition among nations, according to Ko...",
            "keywords": "",
            "snippet": "Fed chair opposes Bitcoin reserves under Trump, causing market decline\n\nBy Lee Yeon-woo\n\nThe United States is moving to designate Bitcoin as a strategic asset, ...",
            "url": "https:\/\/koreatimes.co.kr\/www\/nation\/2024\/12\/816_388810.html",
            "image_url": "https:\/\/img.koreatimes.co.kr\/upload\/thumbnailV2\/526148c72e4d423d8a06cbb50e911975.png",
            "language": "en",
            "published_at": "2024-12-19T20:05:05.000000Z",
            "source": "koreatimes.co.kr",
            "categories": [
                "general"
            ],
            "relevance_score": null,
            "locale": "kr"
        }
    ]
};

const queryClient = new QueryClient();
Element.prototype.scrollTo = jest.fn();

jest.mock("../../api/useFetchStories", () => ({
    useFetchStories: jest.fn(),
}));

describe('Feed Rendered No Errors', () => {

    const refetch = jest.fn();

    beforeEach(() => {
        useFetchStories.mockImplementation(() => ({
            storiesLoading: false,
            storiesError: false,
            storiesData: storiesData,
            storiesSuccess: true,
            storiesRefetch: refetch,
            storiesRefetching: false,
            refetchError: false
        }));
    });

    it('Feed renders correctly with all expected elements', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Feed/>
            </QueryClientProvider>
        );

        expect(screen.getAllByTestId("story.header")).toHaveLength(3);
        expect(screen.getAllByTestId("story.media")).toHaveLength(3);
        expect(screen.getAllByTestId("story.content")).toHaveLength(3);
        expect(screen.getByText("Story 1")).toBeInTheDocument();
        expect(screen.getByText("Story 2")).toBeInTheDocument();
        expect(screen.getByText("Story 3")).toBeInTheDocument();

        expect(screen.getByTestId("nextButton")).toBeInTheDocument();
        const prevButton = screen.getByTestId("prevButton");
        expect(prevButton).toBeDisabled();
        expect(screen.getByText("Page 1")).toBeInTheDocument();

        const apply = screen.getByTestId("applyFiltersButton");
        expect(apply).toBeInTheDocument();
        expect(apply).toBeDisabled();
        expect(screen.getByTestId("refreshButton")).toBeInTheDocument();
        expect(screen.getByTestId("clearFiltersButton")).toBeInTheDocument();

        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes.length).toBe(65);

        getCategories().forEach((category) => {
            expect(screen.getByText(category.value)).toBeInTheDocument();
        });

        getCountries().forEach((country) => {
            expect(screen.getByText(country.value)).toBeInTheDocument();
        });
    });

    it('Feed filter buttons', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Feed/>
            </QueryClientProvider>
        );

        let apply = screen.getByTestId("applyFiltersButton");
        expect(apply).toBeInTheDocument();
        expect(apply).toBeDisabled();
        expect(screen.getByTestId("refreshButton")).toBeInTheDocument();
        expect(screen.getByTestId("clearFiltersButton")).toBeInTheDocument();

        const checkboxes = screen.getAllByRole("checkbox");
        checkboxes[0].click();
        apply = screen.getByTestId("applyFiltersButton");
        expect(apply).not.toBeDisabled();

        apply.click();
        screen.getByTestId("refreshButton").click();
        screen.getByTestId("clearFiltersButton").click();

        expect(refetch).toBeCalled();
    });

    it('Feed page buttons', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Feed/>
            </QueryClientProvider>
        );

        const nextButton = screen.getByTestId("nextButton");
        let prevButton = screen.getByTestId("prevButton");
        expect(prevButton).toBeDisabled()
        expect(screen.getByText("Page 1")).toBeInTheDocument();
        nextButton.click();
        expect(refetch).toBeCalledTimes(1);
    });
});

describe('Feed Rendered Loading', () => {

    const refetch = jest.fn();

    beforeEach(() => {
        useFetchStories.mockImplementation(() => ({
            storiesLoading: true,
            storiesError: false,
            storiesData: null,
            storiesSuccess: true,
            storiesRefetch: refetch,
            storiesRefetching: false,
            refetchError: false
        }));
    });

    it('Feed renders correctly with all expected elements', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Feed/>
            </QueryClientProvider>
        );

        expect(screen.getAllByTestId("loading.story")).toHaveLength(3);
        expect(screen.getAllByTestId("loading.content")).toHaveLength(3);

        const nextButton = screen.getByTestId("nextButton");
        const prevButton = screen.getByTestId("prevButton");
        expect(prevButton).toBeDisabled();
        expect(nextButton).toBeDisabled();
        expect(screen.getByText("Page 1")).toBeInTheDocument();

        const apply = screen.getByTestId("applyFiltersButton");
        expect(apply).toBeDisabled();
        const refresh = screen.getByTestId("refreshButton");
        expect(refresh).toBeDisabled();
        const clear = screen.getByTestId("clearFiltersButton");
        expect(clear).toBeDisabled();
    });
});

describe('Feed Rendered Error', () => {

    const refetch = jest.fn();

    beforeEach(() => {
        useFetchStories.mockImplementation(() => ({
            storiesLoading: false,
            storiesError: {status: -1},
            storiesData: null,
            storiesSuccess: true,
            storiesRefetch: refetch,
            storiesRefetching: false,
            refetchError: false
        }));
    });

    it('Feed renders correctly with all expected elements', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Feed/>
            </QueryClientProvider>
        );

        expect(screen.getAllByTestId("error.story")).toHaveLength(1);
        expect(screen.getAllByTestId("error.content")).toHaveLength(1);
        expect(screen.getAllByTestId("error.header")).toHaveLength(1);

        const nextButton = screen.getByTestId("nextButton");
        const prevButton = screen.getByTestId("prevButton");
        expect(prevButton).toBeDisabled();
        expect(nextButton).toBeDisabled();
        expect(screen.getByText("Page 1")).toBeInTheDocument();

        const apply = screen.getByTestId("applyFiltersButton");
        expect(apply).toBeDisabled();
        const refresh = screen.getByTestId("refreshButton");
        expect(refresh).toBeDisabled();
        const clear = screen.getByTestId("clearFiltersButton");
        expect(clear).toBeDisabled();

        const retry = screen.getByTestId("error.refreshButton");
        expect(retry).toBeInTheDocument();
        retry.click();
        expect(refetch).toBeCalledTimes(1);
    });
});
