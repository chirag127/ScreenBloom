import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

// Define theme colors
const lightTheme = {
    primary: "#6A5ACD", // Slate Blue
    secondary: "#9370DB", // Medium Purple
    background: "#FFFFFF",
    card: "#F8F8F8",
    text: "#333333",
    border: "#E0E0E0",
    notification: "#FF6B6B",
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#F44336",
    info: "#2196F3",
    accent: "#FF9800",
    highlight: "#E6E6FA", // Lavender
    muted: "#9E9E9E",
    disabled: "#BDBDBD",
    placeholder: "#BDBDBD",
    overlay: "rgba(0, 0, 0, 0.5)",
    shadow: "rgba(0, 0, 0, 0.1)",
};

const darkTheme = {
    primary: "#9370DB", // Medium Purple
    secondary: "#B39DDB", // Light Purple
    background: "#121212",
    card: "#1E1E1E",
    text: "#FFFFFF",
    border: "#333333",
    notification: "#FF6B6B",
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#F44336",
    info: "#2196F3",
    accent: "#FF9800",
    highlight: "#483D8B", // Dark Slate Blue
    muted: "#757575",
    disabled: "#616161",
    placeholder: "#757575",
    overlay: "rgba(0, 0, 0, 0.7)",
    shadow: "rgba(0, 0, 0, 0.3)",
};

// Create the context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
    return useContext(ThemeContext);
};

// Provider component
export const ThemeProvider = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [themeMode, setThemeMode] = useState("system"); // 'light', 'dark', or 'system'
    const [theme, setTheme] = useState(
        systemColorScheme === "dark" ? darkTheme : lightTheme
    );

    // Load theme preference from storage on app start
    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const storedThemeMode = await AsyncStorage.getItem("themeMode");
                if (storedThemeMode) {
                    setThemeMode(storedThemeMode);

                    if (storedThemeMode === "light") {
                        setTheme(lightTheme);
                    } else if (storedThemeMode === "dark") {
                        setTheme(darkTheme);
                    } else {
                        // System default
                        setTheme(
                            systemColorScheme === "dark"
                                ? darkTheme
                                : lightTheme
                        );
                    }
                }
            } catch (err) {
                console.error("Failed to load theme preference:", err);
            }
        };

        loadThemePreference();
    }, [systemColorScheme]);

    // Update theme when system color scheme changes
    useEffect(() => {
        if (themeMode === "system") {
            setTheme(systemColorScheme === "dark" ? darkTheme : lightTheme);
        }
    }, [systemColorScheme, themeMode]);

    // Change theme mode
    const changeThemeMode = async (mode) => {
        try {
            setThemeMode(mode);
            await AsyncStorage.setItem("themeMode", mode);

            if (mode === "light") {
                setTheme(lightTheme);
            } else if (mode === "dark") {
                setTheme(darkTheme);
            } else {
                // System default
                setTheme(systemColorScheme === "dark" ? darkTheme : lightTheme);
            }
        } catch (err) {
            console.error("Failed to save theme preference:", err);
        }
    };

    // Context value
    const value = {
        theme,
        themeMode,
        changeThemeMode,
        isDark:
            themeMode === "dark" ||
            (themeMode === "system" && systemColorScheme === "dark"),
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export default ThemeContext;
