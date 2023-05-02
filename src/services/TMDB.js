import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

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
            query: ({ genreIdOrCategoryName, page }) => {
                if (
                    genreIdOrCategoryName &&
                    typeof genreIdOrCategoryName === "string"
                ) {
                    return `movie/${genreIdOrCategoryName}?api_key=${tmdbApiKey}&page=${page}`;
                }

                if (
                    genreIdOrCategoryName &&
                    typeof genreIdOrCategoryName === "number"
                ) {
                    return `discover/movie?api_key=${tmdbApiKey}&page=${page}&with_genres=${genreIdOrCategoryName}`;
                }

                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            },
        }),
    }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
