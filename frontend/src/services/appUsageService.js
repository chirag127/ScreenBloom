// Note: expo-app-usage is not available in the npm registry
// We'll use a simplified approach for app usage tracking
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appBlockerAPI, timeTrackerAPI } from './api';

/**
 * Check if app usage tracking is enabled
 * @returns {Promise<boolean>} True if enabled
 */
export const isAppUsageTrackingEnabled = async () => {
  try {
    const enabled = await AsyncStorage.getItem('appUsageTrackingEnabled');
    return enabled !== 'false';
  } catch (error) {
    console.error('Error checking app usage tracking:', error);
    return true; // Default to enabled
  }
};

/**
 * Enable or disable app usage tracking
 * @param {boolean} enabled - Whether to enable tracking
 * @returns {Promise<void>}
 */
export const setAppUsageTrackingEnabled = async (enabled) => {
  try {
    await AsyncStorage.setItem('appUsageTrackingEnabled', enabled ? 'true' : 'false');
  } catch (error) {
    console.error('Error setting app usage tracking:', error);
  }
};

/**
 * Get app usage stats from local storage
 * @returns {Promise<Object>} App usage stats
 */
export const getAppUsageStats = async () => {
  try {
    const stats = await AsyncStorage.getItem('appUsageStats');
    return stats ? JSON.parse(stats) : {};
  } catch (error) {
    console.error('Error getting app usage stats:', error);
    return {};
  }
};

/**
 * Save app usage stats to local storage
 * @param {Object} stats - App usage stats
 * @returns {Promise<void>}
 */
export const saveAppUsageStats = async (stats) => {
  try {
    await AsyncStorage.setItem('appUsageStats', JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving app usage stats:', error);
  }
};

/**
 * Check if an app should be blocked
 * @param {string} packageName - App package name
 * @returns {Promise<Object>} Blocking info
 */
export const checkAppBlocking = async (packageName) => {
  try {
    const response = await appBlockerAPI.checkApp(packageName);
    return response;
  } catch (error) {
    console.error('Error checking app blocking:', error);
    return { isBlocked: false };
  }
};

/**
 * Track time saved from not using blocked apps
 * @param {string} appName - App name
 * @param {number} minutes - Minutes saved
 * @returns {Promise<Object>} Updated time tracker data
 */
export const trackTimeSaved = async (appName, minutes) => {
  try {
    const response = await timeTrackerAPI.saveTime({
      timeSaved: minutes,
      appName
    });
    return response;
  } catch (error) {
    console.error('Error tracking time saved:', error);
    return null;
  }
};

/**
 * Start tracking app usage
 * @param {string} appName - App name
 * @returns {Promise<void>}
 */
export const startAppUsageTracking = async (appName) => {
  try {
    // Store the start time for the app
    const startTime = new Date();
    await AsyncStorage.setItem(`appUsage_${appName}`, startTime.toISOString());
  } catch (error) {
    console.error('Error starting app usage tracking:', error);
  }
};

/**
 * Stop tracking app usage and calculate time spent
 * @param {string} appName - App name
 * @returns {Promise<number>} Minutes spent
 */
export const stopAppUsageTracking = async (appName) => {
  try {
    // Get the start time for the app
    const startTimeStr = await AsyncStorage.getItem(`appUsage_${appName}`);
    if (!startTimeStr) {
      return 0;
    }

    const startTime = new Date(startTimeStr);
    const endTime = new Date();

    // Calculate minutes spent
    const diffMs = endTime - startTime;
    const minutes = Math.floor(diffMs / 60000);

    // Clear the stored start time
    await AsyncStorage.removeItem(`appUsage_${appName}`);

    return minutes;
  } catch (error) {
    console.error('Error stopping app usage tracking:', error);
    return 0;
  }
};

export default {
  isAppUsageTrackingEnabled,
  setAppUsageTrackingEnabled,
  getAppUsageStats,
  saveAppUsageStats,
  checkAppBlocking,
  trackTimeSaved,
  startAppUsageTracking,
  stopAppUsageTracking,
};
