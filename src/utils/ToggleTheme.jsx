import { createContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ToggleThemeContext = createContext();

const ToggleTheme = ({ children }) => {
    const modePalette = localStorage.getItem("mode") || "light";
    const [mode, setMode] = useState(modePalette);

    const toggleMode = () => {
        setMode((prev) => {
            const newMode = prev === "light" ? "dark" : "light";
            localStorage.setItem("mode", newMode);
            return newMode;
        });
    };

    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });

    return (
        <ToggleThemeContext.Provider value={{ mode, setMode, toggleMode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ToggleThemeContext.Provider>
    );
};

export default ToggleTheme;
