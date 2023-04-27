import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import {
    Movies,
    Profile,
    MovieInfomation,
    Actors,
    NavBar,
} from "../components";

import classes from "./styles";

const App = () => {
    return (
        <BrowserRouter>
            <Box sx={classes.root}>
                <CssBaseline />
                <NavBar />
                <Box sx={classes.content}>
                    <Box sx={classes.toolbar} />
                    <Routes>
                        <Route path="/" element={<Movies />} />
                        <Route
                            path="/movies/:id"
                            element={<MovieInfomation />}
                        />
                        <Route path="/actors/:id" element={<Actors />} />
                        <Route path="/profile/:id" element={<Profile />} />
                    </Routes>
                </Box>
            </Box>
        </BrowserRouter>
    );
};

export default App;
