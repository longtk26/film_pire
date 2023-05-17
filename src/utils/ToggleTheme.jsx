import { createContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ToggleThemeContext = createContext();

const ToggleTheme = ({ children }) => {
    const [mode, setMode] = useState("light");

    const toggleMode = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    const theme = createTheme({
        palette: {
            mode,
        },
    });

    return (
        <ToggleThemeContext.Provider value={{ mode, setMode, toggleMode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ToggleThemeContext.Provider>
    );
};

export default ToggleTheme;
