import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage keys
const STORAGE_KEYS = {
    AUTH_TOKEN: "token",
    USER_DATA: "userData",
    TIME_TRACKER: "timeTracker",
    APP_BLOCKER: "appBlocker",
    MINI_GAMES: "miniGames",
    QUOTES: "quotes",
    USER_PROGRESS: "userProgress",
    OFFLINE_ACTIONS: "offlineActions",
    THEME_MODE: "themeMode",
    NOTIFICATIONS_ENABLED: "notificationsEnabled",
    DAILY_REMINDERS_ENABLED: "dailyRemindersEnabled",
    ACHIEVEMENT_ALERTS_ENABLED: "achievementAlertsEnabled",
};

/**
 * Save data to storage
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 * @returns {Promise<void>}
 */
export const saveData = async (key, data) => {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error(`Error saving data for key ${key}:`, error);
    }
};

/**
 * Get data from storage
 * @param {string} key - Storage key
 * @returns {Promise<any>} Stored data
 */
export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error(`Error getting data for key ${key}:`, error);
        return null;
    }
};

/**
 * Remove data from storage
 * @param {string} key - Storage key
 * @returns {Promise<void>}
 */
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing data for key ${key}:`, error);
    }
};

/**
 * Clear all app data from storage
 * @returns {Promise<void>}
 */
export const clearAllData = async () => {
    try {
        const keys = Object.values(STORAGE_KEYS);
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error("Error clearing all data:", error);
    }
};

/**
 * Save user data to storage
 * @param {Object} userData - User data
 * @returns {Promise<void>}
 */
export const saveUserData = async (userData) => {
    await saveData(STORAGE_KEYS.USER_DATA, userData);
};

/**
 * Get user data from storage
 * @returns {Promise<Object>} User data
 */
export const getUserData = async () => {
    return await getData(STORAGE_KEYS.USER_DATA);
};

/**
 * Save time tracker data to storage
 * @param {Object} timeTracker - Time tracker data
 * @returns {Promise<void>}
 */
export const saveTimeTracker = async (timeTracker) => {
    await saveData(STORAGE_KEYS.TIME_TRACKER, timeTracker);
};

/**
 * Get time tracker data from storage
 * @returns {Promise<Object>} Time tracker data
 */
export const getTimeTracker = async () => {
    return await getData(STORAGE_KEYS.TIME_TRACKER);
};

/**
 * Save app blocker data to storage
 * @param {Object} appBlocker - App blocker data
 * @returns {Promise<void>}
 */
export const saveAppBlocker = async (appBlocker) => {
    await saveData(STORAGE_KEYS.APP_BLOCKER, appBlocker);
};

/**
 * Get app blocker data from storage
 * @returns {Promise<Object>} App blocker data
 */
export const getAppBlocker = async () => {
    return await getData(STORAGE_KEYS.APP_BLOCKER);
};

/**
 * Save mini games data to storage
 * @param {Array} miniGames - Mini games data
 * @returns {Promise<void>}
 */
export const saveMiniGames = async (miniGames) => {
    await saveData(STORAGE_KEYS.MINI_GAMES, miniGames);
};

/**
 * Get mini games data from storage
 * @returns {Promise<Array>} Mini games data
 */
export const getMiniGames = async () => {
    return await getData(STORAGE_KEYS.MINI_GAMES);
};

/**
 * Save quotes data to storage
 * @param {Array} quotes - Quotes data
 * @returns {Promise<void>}
 */
export const saveQuotes = async (quotes) => {
    await saveData(STORAGE_KEYS.QUOTES, quotes);
};

/**
 * Get quotes data from storage
 * @returns {Promise<Array>} Quotes data
 */
export const getQuotes = async () => {
    return await getData(STORAGE_KEYS.QUOTES);
};

/**
 * Save user progress data to storage
 * @param {Object} userProgress - User progress data
 * @returns {Promise<void>}
 */
export const saveUserProgress = async (userProgress) => {
    await saveData(STORAGE_KEYS.USER_PROGRESS, userProgress);
};

/**
 * Get user progress data from storage
 * @returns {Promise<Object>} User progress data
 */
export const getUserProgress = async () => {
    return await getData(STORAGE_KEYS.USER_PROGRESS);
};

/**
 * Add offline action to queue
 * @param {Object} action - Action to queue
 * @param {string} action.type - Action type
 * @param {string} action.endpoint - API endpoint
 * @param {Object} action.data - Action data
 * @returns {Promise<void>}
 */
export const addOfflineAction = async (action) => {
    const offlineActions = (await getData(STORAGE_KEYS.OFFLINE_ACTIONS)) || [];
    offlineActions.push({
        ...action,
        timestamp: new Date().toISOString(),
    });
    await saveData(STORAGE_KEYS.OFFLINE_ACTIONS, offlineActions);
};

/**
 * Get all offline actions
 * @returns {Promise<Array>} Offline actions
 */
export const getOfflineActions = async () => {
    return (await getData(STORAGE_KEYS.OFFLINE_ACTIONS)) || [];
};

/**
 * Clear offline actions
 * @returns {Promise<void>}
 */
export const clearOfflineActions = async () => {
    await removeData(STORAGE_KEYS.OFFLINE_ACTIONS);
};

export default {
    STORAGE_KEYS,
    saveData,
    getData,
    removeData,
    clearAllData,
    saveUserData,
    getUserData,
    saveTimeTracker,
    getTimeTracker,
    saveAppBlocker,
    getAppBlocker,
    saveMiniGames,
    getMiniGames,
    saveQuotes,
    getQuotes,
    saveUserProgress,
    getUserProgress,
    addOfflineAction,
    getOfflineActions,
    clearOfflineActions,
};
