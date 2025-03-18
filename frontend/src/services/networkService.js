import NetInfo from "@react-native-community/netinfo";
import storageService from "./storageService";
import {
    authAPI,
    timeTrackerAPI,
    appBlockerAPI,
    miniGamesAPI,
    quotesAPI,
    progressAPI,
} from "./api";

// Network state
let isConnected = true;
let listeners = [];

/**
 * Initialize network monitoring
 */
export const initNetworkMonitoring = () => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
        const wasConnected = isConnected;
        isConnected = state.isConnected;

        // If we just came back online, sync offline actions
        if (!wasConnected && isConnected) {
            syncOfflineActions();
        }

        // Notify listeners
        listeners.forEach((listener) => listener(isConnected));
    });

    // Initial check
    NetInfo.fetch().then((state) => {
        isConnected = state.isConnected;
    });

    return unsubscribe;
};

/**
 * Add network state change listener
 * @param {Function} listener - Listener function
 * @returns {Function} Function to remove listener
 */
export const addNetworkListener = (listener) => {
    listeners.push(listener);

    // Return function to remove listener
    return () => {
        listeners = listeners.filter((l) => l !== listener);
    };
};

/**
 * Check if device is connected to the internet
 * @returns {Promise<boolean>} True if connected
 */
export const isNetworkConnected = async () => {
    const state = await NetInfo.fetch();
    isConnected = state.isConnected;
    return isConnected;
};

/**
 * Sync offline actions with the server
 * @returns {Promise<void>}
 */
export const syncOfflineActions = async () => {
    try {
        const offlineActions = await storageService.getOfflineActions();

        if (!offlineActions || offlineActions.length === 0) {
            return;
        }

        // Process each action
        for (const action of offlineActions) {
            try {
                await processOfflineAction(action);
            } catch (error) {
                console.error(
                    `Error processing offline action ${action.type}:`,
                    error
                );
            }
        }

        // Clear processed actions
        await storageService.clearOfflineActions();
    } catch (error) {
        console.error("Error syncing offline actions:", error);
    }
};

/**
 * Process a single offline action
 * @param {Object} action - Offline action
 * @returns {Promise<void>}
 */
const processOfflineAction = async (action) => {
    const { type, endpoint, data } = action;

    switch (type) {
        case "saveTime":
            await timeTrackerAPI.saveTime(data);
            break;

        case "createGoal":
            await timeTrackerAPI.createGoal(data);
            break;

        case "allocateTime":
            await timeTrackerAPI.allocateTime(data.goalId, {
                timeToAllocate: data.timeToAllocate,
            });
            break;

        case "completeGoalTime":
            await timeTrackerAPI.completeGoalTime(data.goalId, {
                completedTime: data.completedTime,
            });
            break;

        case "addBlockedApp":
            await appBlockerAPI.addBlockedApp(data);
            break;

        case "updateBlockedApp":
            await appBlockerAPI.updateBlockedApp(data.appId, data.appData);
            break;

        case "removeBlockedApp":
            await appBlockerAPI.removeBlockedApp(data.appId);
            break;

        case "updateSettings":
            await appBlockerAPI.updateSettings(data);
            break;

        case "completeGame":
            await miniGamesAPI.completeGame(data.gameId, {
                duration: data.duration,
            });
            break;

        case "updateStreak":
            await progressAPI.updateStreak();
            break;

        default:
            console.warn(`Unknown offline action type: ${type}`);
    }
};

/**
 * Execute an API call with offline support
 * @param {Function} apiCall - API call function
 * @param {Object} offlineAction - Offline action details
 * @returns {Promise<any>} API response or null if offline
 */
export const executeWithOfflineSupport = async (apiCall, offlineAction) => {
    try {
        // Check network connection
        const connected = await isNetworkConnected();

        if (connected) {
            // If online, make the API call
            return await apiCall();
        } else {
            // If offline, queue the action for later
            if (offlineAction) {
                await storageService.addOfflineAction(offlineAction);
            }

            // Return cached data if available
            switch (offlineAction.type) {
                case "saveTime":
                case "createGoal":
                case "allocateTime":
                case "completeGoalTime":
                    return await storageService.getTimeTracker();

                case "addBlockedApp":
                case "updateBlockedApp":
                case "removeBlockedApp":
                case "updateSettings":
                    return await storageService.getAppBlocker();

                case "completeGame":
                    return await storageService.getUserProgress();

                default:
                    return null;
            }
        }
    } catch (error) {
        console.error("Error executing with offline support:", error);
        throw error;
    }
};

export default {
    initNetworkMonitoring,
    addNetworkListener,
    isNetworkConnected,
    syncOfflineActions,
    executeWithOfflineSupport,
};
