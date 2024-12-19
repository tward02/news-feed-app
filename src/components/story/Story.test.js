import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import Story from "./Story";
import LoadingStory from "./LoadingStory";
import ErrorStory from "./ErrorStory";

const testData = {
    "uuid": "7b4b89ae-f16e-485c-8469-cf018e0f9273",
    "title": "BREAKING NEWS: BOJ to raise interest rates if economy, prices move on track: Ueda",
    "description": "BREAKING NEWS: BOJ to raise interest rates if economy, prices move on track: Ueda==Kyodo",
    "keywords": "Others, Japan News, Kyodo News Plus, Kyodo News, Kyodonews",
    "snippet": "KYODO NEWS - 15 minutes ago - 15:38 | Others BREAKING NEWS: BOJ to raise interest rates if economy, prices move on track: Ueda==Kyodo",
    "url": "https:\/\/english.kyodonews.net\/news\/2024\/12\/915ecc507780-breaking-news-boj-to-raise-interest-rates-if-economy-prices-move-on-track-ueda.html",
    "image_url": "https:\/\/english.kyodonews.net\/favicon.ico",
    "language": "en",
    "published_at": "2024-12-19T15:38:58.000000Z",
    "source": "english.kyodonews.net",
    "categories": [
        "general"
    ],
    "relevance_score": null,
    "locale": "jp"
}

const unauthrisedError = {
    status: 401
}

const paymentError = {
    status: 402
}

const serverError = {
    status: 500
}

const appError = {
    status: 400
}

const noResults = {
    status: -1
}

const reloadFn = jest.fn();

it('Story renders correctly', () => {
    const view = render(
        <Story story={testData}/>,
    );
    expect(screen.getByText("BREAKING NEWS: BOJ to raise interest rates if economy, prices move on track: Ueda")).toBeInTheDocument();
    expect(screen.getByText("BREAKING NEWS: BOJ to raise interest rates if economy, prices move on track: Ueda==Kyodo")).toBeInTheDocument();
    expect(screen.getByText("KYODO NEWS - 15 minutes ago - 15:38 | Others BREAKING NEWS: BOJ to raise interest rates if economy, prices move on track: Ueda==Kyodo")).toBeInTheDocument();
    expect(screen.getByText("english.kyodonews.net" + " " + new Date("2024-12-19T15:38:58.000000Z").toLocaleString())).toBeInTheDocument();
    const link = screen.getByText("Read the full article here");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://english.kyodonews.net/news/2024/12/915ecc507780-breaking-news-boj-to-raise-interest-rates-if-economy-prices-move-on-track-ueda.html");
});

it('Loading story renders correctly', () => {
    const view = render(
        <LoadingStory/>,
    );
    expect(screen.getByTestId("loading.story")).toBeInTheDocument();
    expect(screen.getByTestId("loading.content")).toBeInTheDocument();
});

it('Error story renders correctly', () => {
    const view = render(
        <ErrorStory error={unauthrisedError} reloadFn={reloadFn}/>,
    );
    expect(screen.getByTestId("error.story")).toBeInTheDocument();
    expect(screen.getByTestId("error.content")).toBeInTheDocument();
    expect(screen.getByTestId("error.header")).toBeInTheDocument();
    const reloadButton = screen.getByTestId("error.refreshButton");
    expect(reloadButton).toBeInTheDocument();
    reloadButton.click();
    expect(reloadFn).toHaveBeenCalled();
});

it('No results error story renders correctly', () => {
    const view = render(
        <ErrorStory error={noResults} reloadFn={reloadFn} title={"No Results"}/>,
    );
    expect(screen.getByText("No Results")).toBeInTheDocument();
    expect(screen.getByText("No results for these categories at the moment. Please try again later.")).toBeInTheDocument();
});

it('Unauthorized error story renders correctly', () => {
    const view = render(
        <ErrorStory error={unauthrisedError} reloadFn={reloadFn} title={"Error Fetching Top Stories"}/>,
    );
    expect(screen.getByText("Error Fetching Top Stories")).toBeInTheDocument();
    expect(screen.getByText("You lack the authorisation or permissions necessary to view this content.")).toBeInTheDocument();
});

it('Payment error story renders correctly', () => {
    const view = render(
        <ErrorStory error={paymentError} reloadFn={reloadFn} title={"Error Fetching Top Stories"}/>,
    );
    expect(screen.getByText("Error Fetching Top Stories")).toBeInTheDocument();
    expect(screen.getByText("You have reached your daily request limit.")).toBeInTheDocument();
});

it('Server error story renders correctly', () => {
    const view = render(
        <ErrorStory error={serverError} reloadFn={reloadFn} title={"Error Fetching Top Stories"}/>,
    );
    expect(screen.getByText("Error Fetching Top Stories")).toBeInTheDocument();
    expect(screen.getByText("Server error, please try again later.")).toBeInTheDocument();
});

it('App error story renders correctly', () => {
    const view = render(
        <ErrorStory error={appError} reloadFn={reloadFn} title={"Error Fetching Top Stories"}/>,
    );
    expect(screen.getByText("Error Fetching Top Stories")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong, please try again later. If issue persists, please contact administrator.")).toBeInTheDocument();
});
