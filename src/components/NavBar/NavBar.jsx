import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    AppBar,
    IconButton,
    Toolbar,
    Drawer,
    Button,
    Avatar,
    useMediaQuery,
    Box,
} from "@mui/material";

import {
    Menu,
    AccountCircle,
    Brightness4,
    Brightness7,
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";

import { Link } from "react-router-dom";

import useClassesNavBar from "./useClassesNavBar";
import { Search, Sidebar } from "..";
import { getToken, createSessionId, moviesApi } from "../../utils";
import { ToggleThemeContext } from "../../utils/ToggleTheme";
import { setUser } from "../../features/auth";

const NavBar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    const [mobileOpen, setMobileOpen] = useState(false);
    const dispatch = useDispatch();

    const token = localStorage.getItem("request_token");
    const sessionIdFromLocalStorage = localStorage.getItem("session_id");

    const isMobile = useMediaQuery("(max-width: 600px)");
    const classes = useClassesNavBar();
    const theme = useTheme();

    const colorMode = useContext(ToggleThemeContext);

    useEffect(() => {
        const userLogin = async () => {
            if (token) {
                if (sessionIdFromLocalStorage) {
                    const { data: userData } = await moviesApi.get(
                        `account?session_id=${sessionIdFromLocalStorage}`
                    );
                    dispatch(setUser(userData));
                } else {
                    const sessionId = await createSessionId();
                    const { data: userData } = await moviesApi.get(
                        `account?session_id=${sessionId}`
                    );

                    dispatch(setUser(userData));
                }
            }
        };
        userLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, sessionIdFromLocalStorage]);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar sx={classes.toolbar}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            style={{ outline: "none" }}
                            onClick={() =>
                                setMobileOpen(
                                    (prevMobileOpen) => !prevMobileOpen
                                )
                            }
                            sx={classes.menuButton}
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <IconButton
                        color="inherit"
                        sx={{ ml: 1 }}
                        onClick={colorMode.toggleMode}
                    >
                        {theme.palette.mode === "dark" ? (
                            <Brightness7 />
                        ) : (
                            <Brightness4 />
                        )}
                    </IconButton>

                    {!isMobile && <Search />}
                    <div>
                        {!isAuthenticated ? (
                            <Button color="inherit" onClick={getToken}>
                                Login &nbsp; <AccountCircle />
                            </Button>
                        ) : (
                            <Button
                                color="inherit"
                                component={Link}
                                to={`/profile/${user.id}`}
                                sx={classes.linkButton}
                                onClick={() => {}}
                            >
                                {!isMobile && <>My movies &nbsp;</>}
                                <Avatar
                                    style={{ height: 30, width: 30 }}
                                    alt="Profile"
                                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                />
                            </Button>
                        )}
                    </div>
                    {isMobile && <Search />}
                </Toolbar>
            </AppBar>

            <div>
                <Box component="nav" sx={classes.drawer}>
                    {isMobile ? (
                        <Drawer
                            variant="temporary"
                            anchor="right"
                            open={mobileOpen}
                            onClose={() =>
                                setMobileOpen(
                                    (prevMobileOpen) => !prevMobileOpen
                                )
                            }
                            classes={{ paper: classes.drawerPaper }}
                            ModalProps={{ keepMounted: true }}
                        >
                            <Sidebar setMobileOpen={setMobileOpen} />
                        </Drawer>
                    ) : (
                        <Drawer variant="permanent" open>
                            <Sidebar setMobileOpen={setMobileOpen} />
                        </Drawer>
                    )}
                </Box>
            </div>
        </>
    );
};

export default NavBar;
