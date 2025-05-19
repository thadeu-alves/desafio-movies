import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "c754b1300706e2cdacba819ee706a643",
        language: "en",
    },
});

export async function getGuestSession() {
    try {
        const storedSession =
            localStorage.getItem("guest_session");

        if (storedSession) {
            return storedSession;
        }

        const response = await api.get(
            "/authentication/guest_session/new"
        );
        const { guest_session_id } = response.data;

        localStorage.setItem(
            "guest_session",
            guest_session_id
        );

        return guest_session_id;
    } catch (error) {
        console.error(
            "Error creating guest session:",
            error
        );
        throw error;
    }
}

export async function rateMovie(movieId, rating) {
    try {
        const guestSessionId = await getGuestSession();
        console.log(guestSessionId);

        if (rating < 1 || rating > 10) {
            throw new Error(
                "Rating is not a number between 1 and 10"
            );
        }

        const response = await api.post(
            `/movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
            { value: rating * 2 }
        );

        return response.data;
    } catch (error) {
        console.error("Error rating movie:", error);
        throw error;
    }
}

export async function getRatedMovies() {
    try {
        const guestSessionId = await getGuestSession();
        console.log(guestSessionId);
        const response = await api.get(
            `/guest_session/${guestSessionId}/rated/movies`,
            {
                params: {
                    language: "en-US",
                    page: 1,
                    sort_by: "created_at.asc",
                },
            }
        );

        return response.data || [];
    } catch (error) {
        console.error("Error getting rated movies:", error);
        throw error;
    }
}
