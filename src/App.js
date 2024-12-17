import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import Feed from "./components/feed/Feed";
import classes from './App.module.css';

const App = () => {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <div className={classes.app}>
                <header className={classes.appHeader}>
                    News Feed
                </header>
                <Feed/>
            </div>
        </QueryClientProvider>
    );
};

export default App;
