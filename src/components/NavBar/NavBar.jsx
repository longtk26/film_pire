import {
    AppBar,
    IconButton,
    Toolbar,
    Drawer,
    Button,
    Avatar,
    useMediaQuery,
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

const NavBar = () => {
    const isMobile = useMediaQuery("(max-width: 600px)");
    const classes = useClassesNavBar();
    const theme = useTheme();
    const isAuthenticated = true;

    return (
        <>
            <AppBar position="fixed">
                <Toolbar sx={classes.toolbar}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            style={{ outline: "none" }}
                            onClick={() => {}}
                            sx={classes.menuButton}
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <IconButton
                        color="inherit"
                        sx={{ ml: 1 }}
                        onClick={() => {}}
                    >
                        {theme.palette.mode === "dark" ? (
                            <Brightness7 />
                        ) : (
                            <Brightness4 />
                        )}
                    </IconButton>

                    {!isMobile && "Search..."}
                    <div>
                        {!isAuthenticated ? (
                            <Button color="inherit" onClick={() => {}}>
                                Login &nbsp; <AccountCircle />
                            </Button>
                        ) : (
                            <Button
                                color="inherit"
                                component={Link}
                                to={`/profile/:id`}
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
                    {isMobile && "Search..."}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavBar;
