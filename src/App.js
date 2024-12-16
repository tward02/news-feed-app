import logo from './logo.svg';
import './App.css';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import Feed from "./pages/Feed";
import Story from "./components/story/Story";

function App() {


    const queryClient = new QueryClient()


    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <header className="App-header">
                    <Story></Story>
                    <Feed></Feed>
                </header>
            </div>
        </QueryClientProvider>
    );
}

export default App;
