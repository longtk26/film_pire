import { Grid } from "@mui/material";
import { Movie } from "..";
import useClassesMovieList from "./useClassesMovieList";

const MovieList = ({ movies, numbersOfMovie }) => {
    const classes = useClassesMovieList();

    return (
        <Grid container sx={classes.movieContainer}>
            {movies?.results?.slice(0, numbersOfMovie).map((movie, i) => (
                <Movie key={movie.id} movie={movie} i={i} />
            ))}
        </Grid>
    );
};

export default MovieList;
