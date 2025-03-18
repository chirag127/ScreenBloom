import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Import context providers
import { AuthProvider } from "./src/context/AuthContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

// Import navigation
import AppNavigator from "./src/navigation/AppNavigator";

// Main app component with context providers
const App = () => {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <AppContent />
            </ThemeProvider>
        </SafeAreaProvider>
    );
};

// App content with access to theme context
const AppContent = () => {
    const { theme, isDark } = useTheme();

    return (
        <AuthProvider>
            <StatusBar
                style={isDark ? "light" : "dark"}
                backgroundColor={theme.background}
            />
            <AppNavigator />
        </AuthProvider>
    );
};

export default App;
