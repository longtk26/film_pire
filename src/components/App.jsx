import { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import {
    Movies,
    Profile,
    MovieInfomation,
    Actors,
    NavBar,
} from "../components";

import useAlan from "../hooks/useAlan";
import classes from "./styles";

const App = () => {
    const alanBtnContainer = useRef();
    console.log(window.location.origin);
    useAlan();
    return (
        <BrowserRouter>
            <Box sx={classes.root}>
                <CssBaseline />
                <NavBar />
                <Box sx={classes.content} component="main">
                    <Box sx={classes.toolbar} />
                    <Routes>
                        <Route path="/" element={<Movies />} />
                        <Route path="/index.html" element={<Movies />} />
                        <Route
                            path="/index.html/approved"
                            element={<Movies />}
                        />
                        <Route
                            path="/movie/:id"
                            element={<MovieInfomation />}
                        />
                        <Route path="/actors/:id" element={<Actors />} />
                        <Route path="/profile/:id" element={<Profile />} />
                    </Routes>
                </Box>
                <div ref={alanBtnContainer} />
            </Box>
        </BrowserRouter>
    );
};

export default App;
