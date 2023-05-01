import { useState, useEffect } from "react";
import {
    Box,
    CircularProgress,
    useMediaQuery,
    Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList } from "..";
import useClassesMovies from "./useClassesMovies";

const Movies = () => {
    const { data, isError, isLoading } = useGetMoviesQuery();
    const classes = useClassesMovies();

    if (isLoading) {
        return (
            <Box sx={classes.loading}>
                <CircularProgress size="4rem" />
            </Box>
        );
    }

    if (!data.results.length) {
        return (
            <Box display="flex" alignItems="center" mt="20px">
                <Typography variant="h4">
                    No movies that match that name
                    <br />
                    Please search for something else.
                </Typography>
            </Box>
        );
    }

    if (isError) {
        return "An error occurred ";
    }
    return (
        <div>
            <MovieList movies={data} />
        </div>
    );
};

export default Movies;
