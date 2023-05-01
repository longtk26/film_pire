import { Grid } from "@mui/material";
import { Movie } from "..";
import useClassesMovieList from "./useClassesMovieList";

const MovieList = ({ movies }) => {
    const classes = useClassesMovieList();

    return (
        <Grid container sx={classes.movieContainer}>
            {movies.results.map((movie, i) => (
                <Movie key={movie.id} movie={movie} i={i} />
            ))}
        </Grid>
    );
};

export default MovieList;