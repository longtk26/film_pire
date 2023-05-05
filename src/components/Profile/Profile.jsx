import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

const Profile = () => {
    const { user } = useSelector((state) => state.user);

    const favoriteMovies = [];

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="space-between"
                sx={{ padding: "0 10px" }}
            >
                <Typography variant="h4" gutterBottom>
                    My Profile
                </Typography>
                <Button color="inherit" onClick={logout}>
                    Logout &nbsp; <ExitToApp />
                </Button>
            </Box>

            {!favoriteMovies.length ? (
                <Typography variant="h5" sx={{ padding: "0 10px" }}>
                    Add favorites or watchlist some movies to see them here!
                </Typography>
            ) : (
                <Box>FAVORITE MOVIES</Box>
            )}
        </Box>
    );
};

export default Profile;
