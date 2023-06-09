import { Grid } from "@mui/material";
import { Movie } from "..";
import useClassesMovieList from "./useClassesMovieList";

const MovieList = ({ movies, numbersOfMovie, excludedMovie }) => {
    const startMovie = excludedMovie ? 1 : 0;

    const classes = useClassesMovieList();
    const moviesHavePoster = movies?.results
        ?.filter((item) => item?.poster_path)
        .slice(startMovie, numbersOfMovie);

    return (
        <Grid container sx={classes.movieContainer}>
            {moviesHavePoster?.map((movie, i) => (
                <Movie key={movie.id} movie={movie} i={i} />
            ))}
        </Grid>
    );
};

export default MovieList;
