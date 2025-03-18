import { LogBox } from "react-native";

/**
 * Configure error handling for the app
 * This function suppresses known harmless warnings
 */
export const configureErrorHandling = () => {
    // Ignore specific warnings
    LogBox.ignoreLogs([
        'Unsupported top level event type "topInsetsChange" dispatched',
        "JavaScript logs will be removed from Metro in React Native 0.77",
        "Non-serializable values were found in the navigation state",
        "VirtualizedLists should never be nested",
    ]);

    // Handle uncaught errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
        // Don't log the topInsetsChange error
        if (
            args[0] &&
            typeof args[0] === "string" &&
            args[0].includes("topInsetsChange")
        ) {
            return;
        }
        originalConsoleError(...args);
    };
};

export default {
    configureErrorHandling,
};
