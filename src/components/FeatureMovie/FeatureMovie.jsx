import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const FeatureMovie = ({ movie }) => {
    return (
        <Box
            component={Link}
            to={`/movie/${movie?.id}`}
            sx={{ mb: "25px", display: "block" }}
        >
            <Card
                sx={{
                    position: "relative",
                }}
            >
                <CardMedia
                    image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    sx={{ width: "100%", height: "490px" }}
                />
                <Box
                    sx={{
                        width: "100%",
                        p: "20px",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                    }}
                >
                    <CardContent
                        sx={{
                            color: "white",
                            width: {
                                lg: "40%",
                                md: "80%",
                                xs: "100%",
                            },
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            {movie?.original_title}
                        </Typography>
                        <Typography variant="body2">
                            {movie?.overview}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
};

export default FeatureMovie;
