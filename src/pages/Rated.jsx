import { useState, useEffect } from "react";
import {
    Row,
    Col,
    Spinner,
    Container,
} from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import { getRatedMovies } from "../axios";
import { PageSection } from "../styles";
import { Link } from "react-router-dom";

export default function Rated() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasSession, setHasSession] = useState(false);

    useEffect(() => {
        const session =
            localStorage.getItem("guest_session");
        setHasSession(!!session);

        if (!session) {
            setLoading(false);
            return;
        }

        async function fetchRatedMovies() {
            try {
                const response = await getRatedMovies();
                setMovies(response.results);
            } catch (error) {
                console.error(
                    "Error fetching movies:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        fetchRatedMovies();
    }, []);

    if (!hasSession) {
        return (
            <PageSection>
                <h1>Rated Movies</h1>
                <p>Can't find rated movies.</p>
                <p>
                    Go and <Link to="/">Rate</Link>
                </p>
            </PageSection>
        );
    }

    if (loading) {
        return (
            <div className="loading-spinner">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <PageSection>
            <h1>Rated Movies</h1>
            <Container fluid>
                <Row
                    xs={1}
                    sm={2}
                    md={3}
                    lg={4}
                    xl={5}
                    className="g-4"
                >
                    {movies.map((movie) => (
                        <Col key={movie.id}>
                            <MovieCard
                                movie={movie}
                                rated={movie.rating / 2}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </PageSection>
    );
}
