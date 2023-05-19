import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import {
    useGetMoviesOfActorQuery,
    useGetActorQuery,
} from "../../services/TMDB";
import { createDayMonthYear } from "../../utils";
import { MovieList, Pagination } from "../";

const Actors = () => {
    const [page, setPage] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: movies } = useGetMoviesOfActorQuery({ id, page });
    const { data, isFetching } = useGetActorQuery(id);
    const [timeUI, dayOfWeek] = createDayMonthYear(data?.birthday);

    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size="4rem" />
            </Box>
        );
    }

    return (
        <>
            <Grid
                container
                sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Grid item xs={12} lg={4}>
                    <Box
                        component="img"
                        src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
                        alt={data?.name}
                        sx={{
                            height: {
                                xs: "350px",
                                md: "600px",
                            },
                            mb: "30px",
                            boxShadow: "0.5em 1em 1em",
                            borderRadius: "20px",
                            ml: {
                                xs: "30px",
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Typography variant="h3" fontSize="3.75rem" gutterBottom>
                        {data?.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Born: {dayOfWeek} {timeUI} {!timeUI && "Not infomation"}
                    </Typography>
                    <Typography
                        variant="body2"
                        textAlign="justify"
                        gutterBottom
                    >
                        {data?.biography}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            mt: "32px",
                        }}
                    >
                        <Button
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://www.imdb.com/name/${data.imdb_id}`}
                            variant="contained"
                        >
                            IMDB
                        </Button>
                        <Button
                            onClick={() => navigate(-1)}
                            endIcon={<ArrowBack />}
                        >
                            Back
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Box marginTop={8}>
                <Typography
                    variant="h3"
                    fontSize="3.75rem"
                    gutterBottom
                    align="center"
                >
                    Movies
                </Typography>
                <MovieList movies={movies} numbersOfMovie={12} />
                <Pagination
                    currentPage={page}
                    setPage={setPage}
                    totalPages={movies?.total_pages}
                />
            </Box>
        </>
    );
};

export default Actors;
