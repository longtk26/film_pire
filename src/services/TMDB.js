import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const accountId = localStorage.getItem("account_id");
const sessionId = localStorage.getItem("session_id");

export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
    endpoints: (builder) => ({
        // Get genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
        }),

        // Get movies by [Type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                //* Get by searching

                if (searchQuery) {
                    return `search/movie?api_key=${tmdbApiKey}&page=${page}&query=${searchQuery}`;
                }

                //* Get categories
                if (
                    genreIdOrCategoryName &&
                    typeof genreIdOrCategoryName === "string"
                ) {
                    return `movie/${genreIdOrCategoryName}?api_key=${tmdbApiKey}&page=${page}`;
                }

                //* Get genres
                if (
                    genreIdOrCategoryName &&
                    typeof genreIdOrCategoryName === "number"
                ) {
                    return `discover/movie?api_key=${tmdbApiKey}&page=${page}&with_genres=${genreIdOrCategoryName}`;
                }

                //* Get default
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            },
        }),

        // Get movie
        getMovie: builder.query({
            query: (id) =>
                `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
        }),

        // Get movie recommendations

        getMovieRecommendations: builder.query({
            query: ({ id, page }) =>
                `movie/${id}/recommendations?api_key=${tmdbApiKey}&page=${page}`,
        }),

        // Get actor info

        getMoviesOfActor: builder.query({
            query: ({ id, page }) =>
                `discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
        }),

        getActor: builder.query({
            query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
        }),

        //Favorites and watchlists

        getFavoriteMovies: builder.query({
            query: () =>
                `account/${accountId}/favorite/movies?page=1&api_key=${tmdbApiKey}&session_id=${sessionId}&sort_by=created_at.desc`,
        }),

        getWatchListMovies: builder.query({
            query: () =>
                `account/${accountId}/watchlist/movies?page=1&api_key=${tmdbApiKey}&session_id=${sessionId}&sort_by=created_at.desc`,
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetMovieRecommendationsQuery,
    useGetMoviesOfActorQuery,
    useGetActorQuery,
    useGetFavoriteMoviesQuery,
    useGetWatchListMoviesQuery,
} = tmdbApi;
