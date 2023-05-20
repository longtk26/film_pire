import { useState } from "react";
import {
    Box,
    CircularProgress,
    useMediaQuery,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList, Pagination, FeatureMovie } from "..";
import useClassesMovies from "./useClassesMovies";

const Movies = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("xl"));
    const numbersOfMovie = isLarge ? 18 : 16;

    const [page, setPage] = useState(1);

    const { genreIdOrCategoryName, searchQuery } = useSelector(
        (state) => state.currentGenreOrCategory
    );

    const { data, isError, isFetching } = useGetMoviesQuery({
        genreIdOrCategoryName,
        page,
        searchQuery,
    });

    const classes = useClassesMovies();

    if (isFetching) {
        return (
            <Box sx={classes.loading}>
                <CircularProgress size="4rem" />
            </Box>
        );
    }

    if (!data.results.length) {
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt="20px"
            >
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
            <FeatureMovie movie={data?.results[0]} />
            <MovieList
                movies={data}
                numbersOfMovie={numbersOfMovie}
                excludedMovie
            />
            <Pagination
                currentPage={page}
                setPage={setPage}
                totalPage={data?.total_pages}
            />
        </div>
    );
};

export default Movies;
