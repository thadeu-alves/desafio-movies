import { useState, useEffect } from "react";
import {
    Row,
    Col,
    Spinner,
    Container,
} from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import { api } from "../axios";
import { PageSection } from "../styles";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPopularMovies() {
            try {
                const response = await api.get(
                    "/movie/popular"
                );
                setMovies(response.data.results);
            } catch (error) {
                console.error(
                    "Error fetching movies:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        fetchPopularMovies();
    }, []);

    if (loading) {
        return (
            <div className="loading-spinner">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <PageSection>
            <h1>All Movies</h1>
            <Container fluid>
                <Row
                    xs={1}
                    sm={2}
                    md={3}
                    lg={4}
                    xl={5}
                    className="g-4"
                >
                    {movies.map((movie) => {
                        return (
                            <Col key={movie.id}>
                                <MovieCard movie={movie} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </PageSection>
    );
}
