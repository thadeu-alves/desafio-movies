import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Rated from "./pages/Rated";

function App() {
    return (
        <Router>
            <Navigation />
            <Container className="mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/rated"
                        element={<Rated />}
                    />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
