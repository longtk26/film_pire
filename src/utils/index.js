import axios from "axios";

const api_key = process.env.REACT_APP_TMDB_KEY;

export const moviesApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key,
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

    if (token) {
        try {
            const {
                data: { session_id },
            } = await moviesApi.post(`authentication/session/new`, {
                request_token: token,
            });

            localStorage.setItem("session_id", session_id);

            return session_id;
        } catch (error) {
            console.log(error);
        }
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

    const timeElement = time?.split("-");

    if (timeElement) {
        const month = months[timeElement[1]];
        const day = timeElement[2];
        const year = timeElement[0];
        const timeUI = `${month} ${day} ${year}`;
        return timeUI;
    }
};
