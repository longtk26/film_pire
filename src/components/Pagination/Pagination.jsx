import { Box, Button, Typography } from "@mui/material";

const Pagination = ({ currentPage, setPage, totalPages }) => {
    const handlePrev = () => {
        if (currentPage !== 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage !== totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
            <Button size="medium" variant="contained" onClick={handlePrev}>
                Prev
            </Button>
            <Typography variant="h4" sx={{ m: "0 20px" }}>
                {currentPage}
            </Typography>
            <Button size="medium" variant="contained" onClick={handleNext}>
                Next
            </Button>
        </Box>
    );
};

export default Pagination;
