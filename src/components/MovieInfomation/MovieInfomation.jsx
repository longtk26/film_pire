import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Grid,
    Modal,
    Rating,
    Typography,
} from "@mui/material";
import {
    ArrowBack,
    Favorite,
    FavoriteBorder,
    Language,
    LocalMovies,
    Movie,
    PlusOne,
    Remove,
} from "@mui/icons-material";

import {
    useGetFavoriteMoviesQuery,
    useGetWatchListMoviesQuery,
    useGetMovieQuery,
    useGetMovieRecommendationsQuery,
} from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import {
    createDayMonthYear,
    handleAddToFavorite,
    handleAddToWatchlist,
} from "../../utils";
import { MovieList, Pagination } from "../";
import genresIcon from "../../assets/genres";

const MovieInfomation = () => {
    const [page, setPage] = useState(1);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const theme = useTheme();

    const { data, isFetching, isError } = useGetMovieQuery(id);
    const { data: favoriteMovies } = useGetFavoriteMoviesQuery({
        accountId: user.id,
        sessionId: localStorage.getItem("session_id"),
    });
    const { data: watchlistMovies } = useGetWatchListMoviesQuery({
        accountId: user.id,
        sessionId: localStorage.getItem("session_id"),
    });
    const { data: recommendations, isFetching: isFetchingRecommendations } =
        useGetMovieRecommendationsQuery({ id, page });

    const [timeUI] = createDayMonthYear(data?.release_date);

    const [favorite, setFavorite] = useState(false);
    const [addWatchList, setAddWatchList] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setFavorite(
            !!favoriteMovies?.results?.find((item) => item.id === data?.id)
        );
    }, [favoriteMovies, data?.id]);

    useEffect(() => {
        setAddWatchList(
            !!watchlistMovies?.results?.find((item) => item.id === data?.id)
        );
    }, [watchlistMovies, data?.id]);

    const addToFavorite = async () => {
        await handleAddToFavorite(id, favorite);
        setFavorite((prev) => !prev);
    };

    const addToWatchList = async () => {
        await handleAddToWatchlist(id, addWatchList);
        setAddWatchList((prev) => !prev);
    };

    const topCastsData = data?.credits?.cast
        ?.filter((item) => item?.profile_path)
        .slice(0, 6);

    if (isFetching) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center">
                <CircularProgress size="8rem" />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center">
                <Link to="/">
                    <Typography variant="h3">
                        Something is wrong please redirect to home page
                    </Typography>
                </Link>
            </Box>
        );
    }

    return (
        <>
            <Grid
                container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    [theme.breakpoints.up("md")]: {
                        flexWrap: "nowrap",
                        flexDirection: "row",
                        my: "10px",
                    },
                }}
            >
                <Grid item md={6}>
                    <Box
                        component="img"
                        src={`https://image.tmdb.org/t/p/w500//${data?.poster_path}`}
                        alt={id}
                        sx={{
                            height: {
                                xs: "350px",
                                md: "450px",
                            },
                            mb: "30px",
                            boxShadow: "0.5em 1em 1em rgb(64, 64, 70)",
                            borderRadius: "20px",
                            ml: {
                                md: "30px",
                            },
                        }}
                    />
                </Grid>
                <Grid
                    item
                    container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        [theme.breakpoints.down("sm")]: {
                            justifyContent: "center",
                        },
                        pl: {
                            md: "80px",
                        },
                    }}
                >
                    <Typography variant="h3" gutterBottom align="center">
                        {data?.title} ({data?.release_date.split("-")[0]})
                    </Typography>
                    <Typography variant="h5" align="center" gutterBottom>
                        {data?.tagline}
                    </Typography>
                    <Grid
                        item
                        sx={{
                            my: "10px",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                            [theme.breakpoints.up("md")]: {},
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                mb: "10px",
                            }}
                        >
                            <Rating readOnly value={data?.vote_average / 2} />
                            <Typography sx={{ ml: "10px" }} variant="subtitle1">
                                {data?.vote_average} / 10
                            </Typography>
                        </Box>
                        <Typography
                            varient="h6"
                            align="center"
                            gutterBottom
                            fontSize="1.25rem"
                        >
                            {data?.runtime}min / {timeUI} /{" "}
                            {data?.spoken_languages[0]?.english_name}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                            alignItems: "center",
                            my: "10px",
                        }}
                    >
                        {data.genres.map(({ name, id }) => (
                            <Link
                                key={id}
                                onClick={() =>
                                    dispatch(selectGenreOrCategory(id))
                                }
                                to="/"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textDecoration: "none",
                                    padding: "8px 16px",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={genresIcon[name.toLowerCase()]}
                                    height={30}
                                    marginRight="10px"
                                    alt={name}
                                />

                                <Typography varient="h6" color="black">
                                    {name}
                                </Typography>
                            </Link>
                        ))}
                    </Grid>
                    <Typography variant="h5" gutterBottom sx={{ mt: "10px" }}>
                        Overview
                    </Typography>
                    <Typography variant="body1" marginBottom="20px">
                        {data.overview}
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ mt: "10px" }}>
                        Top Cast
                    </Typography>
                    <Grid item container spacing={2}>
                        {topCastsData.map((castItem) => (
                            <Grid
                                item
                                component={Link}
                                key={castItem.id}
                                to={`/actors/${castItem.id}`}
                                sx={{ textDecoration: "none" }}
                                xs={4}
                                md={2}
                            >
                                <Box
                                    component="img"
                                    alt={castItem.name}
                                    src={
                                        castItem.profile_path
                                            ? `https://image.tmdb.org/t/p/w500/${castItem.profile_path}`
                                            : `http://s3.amazonaws.com/37assets/svn/765-default-avatar.png`
                                    }
                                    sx={{
                                        height: "128px",
                                        borderRadius: "10px",
                                        objectFit: "cover",
                                        width: "98px",
                                    }}
                                />
                                <Typography variant="body1" color="textPrimary">
                                    {castItem.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    {castItem.character.split("/")[0]}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid
                        item
                        container
                        sx={{
                            mt: "2rem",
                            rowGap: {
                                xs: "2rem",
                            },
                        }}
                    >
                        <Grid item xs={12} lg={6}>
                            <ButtonGroup size="small" variant="outlined">
                                <Button
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={
                                        data?.homepage !== ""
                                            ? data.homepage
                                            : "#"
                                    }
                                    sx={{
                                        fontWeight: 400,
                                        p: {
                                            md: "5px 15px",
                                        },
                                    }}
                                    endIcon={<Language />}
                                >
                                    Website
                                </Button>
                                <Button
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://www.imdb.com/title/${data.imdb_id}`}
                                    sx={{
                                        fontWeight: 400,
                                        p: {
                                            md: "5px 15px",
                                        },
                                    }}
                                    endIcon={<Movie />}
                                >
                                    IMDB
                                </Button>
                                <Button
                                    sx={{
                                        fontWeight: 400,
                                        p: {
                                            md: "5px 15px",
                                        },
                                    }}
                                    href="#"
                                    onClick={() => setOpen(true)}
                                    endIcon={<LocalMovies />}
                                >
                                    Trailer
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ButtonGroup size="small" variant="outlined">
                                <Button
                                    sx={{
                                        fontWeight: 400,
                                        p: {
                                            md: "5px 15px",
                                        },
                                    }}
                                    onClick={addToFavorite}
                                    endIcon={
                                        favorite ? (
                                            <FavoriteBorder />
                                        ) : (
                                            <Favorite />
                                        )
                                    }
                                >
                                    {favorite ? "Unfavorite" : "Favorite"}
                                </Button>
                                <Button
                                    sx={{
                                        fontWeight: 400,
                                        p: {
                                            md: "5px 15px",
                                        },
                                    }}
                                    onClick={addToWatchList}
                                    endIcon={
                                        addWatchList ? <Remove /> : <PlusOne />
                                    }
                                >
                                    Watchlist
                                </Button>
                                <Button
                                    sx={{
                                        fontWeight: 400,
                                        p: {
                                            md: "5px 15px",
                                        },
                                    }}
                                    endIcon={<ArrowBack />}
                                >
                                    <Link
                                        to="/"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        Back
                                    </Link>
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ textAlign: "center", mt: "4rem" }}>
                <Typography variant="h3" gutterBottom>
                    You might also like
                </Typography>
                {isFetchingRecommendations ? (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <CircularProgress size="8rem" />
                    </Box>
                ) : (
                    <>
                        <MovieList
                            movies={recommendations}
                            numbersOfMovie={12}
                        />
                        <Pagination
                            currentPage={page}
                            setPage={setPage}
                            totalPages={recommendations?.total_pages}
                        />
                    </>
                )}
            </Box>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    component="iframe"
                    src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
                    title="YouTube video player"
                    frameborder="0"
                    sx={{
                        width: {
                            xs: "90%",
                            sm: "70%",
                            md: "50%",
                        },
                        height: {
                            xs: "90%",
                            sm: "70%",
                            md: "50%",
                        },
                    }}
                />
            </Modal>
        </>
    );
};

export default MovieInfomation;
