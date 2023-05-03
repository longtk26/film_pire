import { Grid, Typography, Rating, Grow, Box, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

import useClassesMovie from "./useClassesMovie";

const Movie = ({ movie, i }) => {
    const classes = useClassesMovie();

    return (
        <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            sx={classes.movieContain}
        >
            <Grow in key={i} timeout={(i + 1) * 250}>
                <Link to={`/movie/${movie.id}`} style={classes.links}>
                    <Box sx={classes.image}>
                        <img
                            alt={movie.title}
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                    : "https://image.tmdb.org/t/p/w500//rBxo92GmbsQbinrbJOFnmiKuMXj.jpg"
                            }
                            height={300}
                            style={{ borderRadius: 20 }}
                        />
                    </Box>

                    <Typography variant="h5" sx={classes.title}>
                        {movie.title}
                    </Typography>
                    <Tooltip
                        disableTouchListener
                        title={`${movie.vote_average} / 10`}
                    >
                        <div>
                            <Rating
                                readOnly
                                value={movie.vote_average / 2}
                                precision={0.1}
                            />
                        </div>
                    </Tooltip>
                </Link>
            </Grow>
        </Grid>
    );
};

export default Movie;
