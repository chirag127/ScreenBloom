import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Import context providers
import { AuthProvider } from "./src/context/AuthContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { NetworkProvider } from "./src/context/NetworkContext";

// Import utilities
import { configureErrorHandling } from "./src/utils/errorHandler";

// Import navigation
import AppNavigator from "./src/navigation/AppNavigator";

// Main app component with context providers
const App = () => {
    // Configure error handling
    useEffect(() => {
        configureErrorHandling();
    }, []);
    return (
        <SafeAreaProvider>
            <NetworkProvider>
                <ThemeProvider>
                    <AppContent />
                </ThemeProvider>
            </NetworkProvider>
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
