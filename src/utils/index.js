import axios from "axios";

const api_key = process.env.REACT_APP_TMDB_KEY;

export const moviesApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: api_key,
    },
});

export const getToken = async () => {
    try {
        const { data } = await moviesApi.get(`authentication/token/new`);

        if (data.success) {
            const token = data.request_token;

            localStorage.setItem("request_token", token);

            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.log(error);
    }
};

export const createSessionId = async () => {
    const token = localStorage.getItem("request_token");

    try {
        if (token) {
            const {
                data: { session_id },
            } = await moviesApi.post(`authentication/session/new`, {
                request_token: token,
            });

            localStorage.setItem("session_id", session_id);

            return session_id;
        }
    } catch (error) {
        console.log(error);
    }
};

export const handleAddToFavorite = async (movieId, favoriteState) => {
    const accountId = localStorage.getItem("account_id");
    const sessionId = localStorage.getItem("session_id");

    if (!accountId || !sessionId) return null;

    try {
        await axios.post(
            `https://api.themoviedb.org/3/account/${accountId}/favorite?session_id=${sessionId}&api_key=${api_key}`,
            {
                media_type: "movie",
                media_id: movieId,
                favorite: !favoriteState,
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export const handleAddToWatchlist = async (movieId, watchListState) => {
    const accountId = localStorage.getItem("account_id");
    const sessionId = localStorage.getItem("session_id");

    if (!accountId || !sessionId) return null;

    try {
        await axios.post(
            `https://api.themoviedb.org/3/account/${accountId}/watchlist?session_id=${sessionId}&api_key=${api_key}`,
            {
                media_type: "movie",
                media_id: movieId,
                watchlist: !watchListState,
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export const createDayMonthYear = (time) => {
    const months = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
    };
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if (time) {
        const date = new Date(time);

        const timeElement = time?.split("-");

        const dayOfWeek = daysOfWeek[date.getDay()];
        const month = months[timeElement[1]];
        const day = timeElement[2];
        const year = timeElement[0];

        const timeUI = `${month} ${day} ${year}`;
        return [timeUI, dayOfWeek];
    }

    return [];
};
