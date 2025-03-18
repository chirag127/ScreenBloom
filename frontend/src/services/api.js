import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Base URL for API requests
const API_URL = "http://localhost:5001/api";

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers["x-auth-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Authentication API calls
export const authAPI = {
    register: async (userData) => {
        try {
            const response = await api.post("/auth/register", userData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post("/auth/login", credentials);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    getUser: async () => {
        try {
            const response = await api.get("/auth/user");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },
};

// Time Tracker API calls
export const timeTrackerAPI = {
    getTimeTracker: async () => {
        try {
            const response = await api.get("/time-tracker");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    saveTime: async (timeData) => {
        try {
            const response = await api.post(
                "/time-tracker/save-time",
                timeData
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    createGoal: async (goalData) => {
        try {
            const response = await api.post("/time-tracker/goals", goalData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    allocateTime: async (goalId, timeData) => {
        try {
            const response = await api.put(
                `/time-tracker/goals/${goalId}/allocate`,
                timeData
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    completeGoalTime: async (goalId, timeData) => {
        try {
            const response = await api.put(
                `/time-tracker/goals/${goalId}/complete`,
                timeData
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    getStats: async () => {
        try {
            const response = await api.get("/time-tracker/stats");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },
};

// App Blocker API calls
export const appBlockerAPI = {
    getAppBlocker: async () => {
        try {
            const response = await api.get("/app-blocker");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    addBlockedApp: async (appData) => {
        try {
            const response = await api.post("/app-blocker/apps", appData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    updateBlockedApp: async (appId, appData) => {
        try {
            const response = await api.put(
                `/app-blocker/apps/${appId}`,
                appData
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    removeBlockedApp: async (appId) => {
        try {
            const response = await api.delete(`/app-blocker/apps/${appId}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    updateSettings: async (settingsData) => {
        try {
            const response = await api.put(
                "/app-blocker/settings",
                settingsData
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    checkApp: async (packageName) => {
        try {
            const response = await api.get(`/app-blocker/check/${packageName}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },
};

// Mini Games API calls
export const miniGamesAPI = {
    getAllGames: async () => {
        try {
            const response = await api.get("/mini-games");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    getAvailableGames: async () => {
        try {
            const response = await api.get("/mini-games/available");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    getGameById: async (gameId) => {
        try {
            const response = await api.get(`/mini-games/${gameId}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    completeGame: async (gameId, gameData) => {
        try {
            const response = await api.post(
                `/mini-games/${gameId}/complete`,
                gameData
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },
};

// Quotes API calls
export const quotesAPI = {
    getUnlockedQuotes: async () => {
        try {
            const response = await api.get("/quotes/unlocked");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    getRandomQuote: async () => {
        try {
            const response = await api.get("/quotes/random");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    getQuotesByCategory: async (category) => {
        try {
            const response = await api.get(`/quotes/category/${category}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },
};

// User Progress API calls
export const progressAPI = {
    getUserProgress: async () => {
        try {
            const response = await api.get("/progress");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    getAchievements: async () => {
        try {
            const response = await api.get("/progress/achievements");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    getStreak: async () => {
        try {
            const response = await api.get("/progress/streak");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    updateStreak: async () => {
        try {
            const response = await api.put("/progress/streak/update");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },
};

export default {
    authAPI,
    timeTrackerAPI,
    appBlockerAPI,
    miniGamesAPI,
    quotesAPI,
    progressAPI,
};
