import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { rateMovie } from "../axios";
import { useState } from "react";

const StyledCard = styled(Card)`
    transition: transform 0.3s;
    &:hover {
        transform: scale(1.03);
    }
    .card-img-top {
        height: 400px;
        object-fit: cover;
    }
`;

const StarList = styled.div`
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 10px;

    button {
        border: none;
    }
`;

export default function MovieCard({ movie, rated = 1 }) {
    const [rating, setRating] = useState(rated);
    const [loading, setLoading] = useState(false);

    async function rate(movieId) {
        setLoading(true);
        const res = await rateMovie(movieId, rating);
        console.log(res);
        setTimeout(() => {
            window.location.href = "/rated";
        }, 1000);
    }

    return (
        <StyledCard>
            <Link>
                <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            </Link>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                    <small className="text-muted">
                        Rating: {movie.vote_average}
                    </small>
                </Card.Text>
                <StarList>
                    {[1, 2, 3, 4, 5].map((star, id) => {
                        const rated = id < rating;

                        return (
                            <button
                                key={star}
                                onClick={() =>
                                    setRating(star)
                                }
                                style={{
                                    color: rated
                                        ? "gold"
                                        : "gray",
                                }}
                            >
                                ★
                            </button>
                        );
                    })}
                </StarList>
                <Button onClick={() => rate(movie.id)}>
                    {loading ? "Rating..." : "Rate Movie"}
                </Button>
            </Card.Body>
        </StyledCard>
    );
}
