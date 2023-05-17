import { Box, Typography } from "@mui/material";
import { Movie } from "..";

const RatedCards = ({ title, data }) => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <Box
                display="flex"
                flexWrap="wrap"
                sx={{
                    gap: {
                        lg: 4,
                    },
                    ml: {
                        lg: "12px",
                    },
                    justifyContent: {
                        xs: "center",
                        lg: "unset",
                    },
                }}
            >
                {data?.map((movie, i) => (
                    <Movie key={movie.id} movie={movie} i={i} />
                ))}
            </Box>
        </Box>
    );
};

export default RatedCards;
