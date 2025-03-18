import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI } from "../services/api";

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load token and user data from storage on app start
    useEffect(() => {
        const loadStoredData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");

                if (storedToken) {
                    setToken(storedToken);

                    // Fetch user data
                    const userData = await authAPI.getUser();
                    setUser(userData);
                }
            } catch (err) {
                console.error("Failed to load auth data:", err);
                setError("Failed to authenticate. Please login again.");
            } finally {
                setLoading(false);
            }
        };

        loadStoredData();
    }, []);

    // Register a new user
    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authAPI.register(userData);

            // Store token
            await AsyncStorage.setItem("token", response.token);
            setToken(response.token);

            // Fetch user data
            const userResponse = await authAPI.getUser();
            setUser(userResponse);

            return userResponse;
        } catch (err) {
            setError(err.msg || "Registration failed. Please try again.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Login user
    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authAPI.login(credentials);

            // Store token
            await AsyncStorage.setItem("token", response.token);
            setToken(response.token);

            // Fetch user data
            const userResponse = await authAPI.getUser();
            setUser(userResponse);

            return userResponse;
        } catch (err) {
            setError(err.msg || "Login failed. Please check your credentials.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout user
    const logout = async () => {
        try {
            setLoading(true);

            // Remove token from storage
            await AsyncStorage.removeItem("token");

            // Clear state
            setToken(null);
            setUser(null);
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Update user profile
    const updateProfile = async (updatedData) => {
        try {
            setLoading(true);
            setError(null);

            // This would require an API endpoint to update user profile
            // For now, we'll just update the local state
            setUser({ ...user, ...updatedData });

            return user;
        } catch (err) {
            setError(err.msg || "Failed to update profile.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Context value
    const value = {
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
