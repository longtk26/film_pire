import { useRef } from "react";
import { Routes, Route } from "react-router-dom";
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

    useAlan();
    return (
        <Box sx={classes.root}>
            <CssBaseline />
            <NavBar />
            <Box sx={classes.content} component="main">
                <Box sx={classes.toolbar} />
                <Routes>
                    <Route path="/" element={<Movies />} />
                    <Route path="/approved" element={<Movies />} />
                    <Route path="/movie/:id" element={<MovieInfomation />} />
                    <Route path="/actors/:id" element={<Actors />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Routes>
            </Box>
            <div ref={alanBtnContainer} />
        </Box>
    );
};

export default App;
