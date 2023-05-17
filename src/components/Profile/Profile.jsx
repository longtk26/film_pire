import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import {
    useGetFavoriteMoviesQuery,
    useGetWatchListMoviesQuery,
} from "../../services/TMDB";
import { RatedCards } from "..";

const Profile = () => {
    const { data: favoriteMovies, refetch: refetchFavorite } =
        useGetFavoriteMoviesQuery();
    const { data: watchlistMovies, refetch: refetchWatchlist } =
        useGetWatchListMoviesQuery();

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    useEffect(() => {
        refetchFavorite();
        refetchWatchlist();
    }, []);

    return (
        <Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h4" gutterBottom>
                    My Profile
                </Typography>
                <Button color="inherit" onClick={logout}>
                    Logout &nbsp; <ExitToApp />
                </Button>
            </Box>

            {!favoriteMovies?.results?.length &&
            !watchlistMovies?.results?.length ? (
                <Typography variant="h5" sx={{ padding: "0 10px" }}>
                    Add favorites or watchlist some movies to see them here!
                </Typography>
            ) : (
                <Box>
                    <RatedCards
                        title="Favorite Movies"
                        data={favoriteMovies?.results}
                    />
                    <RatedCards
                        title="Watchlist Movies"
                        data={watchlistMovies?.results}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Profile;
