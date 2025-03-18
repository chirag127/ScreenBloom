import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configure notifications
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

/**
 * Register for push notifications
 * @returns {Promise<string|null>} Expo push token or null if not available
 */
export const registerForPushNotificationsAsync = async () => {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            console.log("Failed to get push token for push notification!");
            return null;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        console.log("Must use physical device for push notifications");
    }

    // Store token in AsyncStorage
    if (token) {
        await AsyncStorage.setItem("pushToken", token);
    }

    return token;
};

/**
 * Schedule a local notification
 * @param {Object} options - Notification options
 * @param {string} options.title - Notification title
 * @param {string} options.body - Notification body
 * @param {Object} options.data - Notification data
 * @param {Date} options.trigger - When to trigger the notification
 * @returns {Promise<string>} Notification identifier
 */
export const scheduleLocalNotification = async ({
    title,
    body,
    data = {},
    trigger,
}) => {
    // Check if notifications are enabled
    const notificationsEnabled = await AsyncStorage.getItem(
        "notificationsEnabled"
    );
    if (notificationsEnabled === "false") {
        return null;
    }

    return await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
            data,
        },
        trigger,
    });
};

/**
 * Schedule a daily reminder notification
 * @param {Object} options - Notification options
 * @param {string} options.title - Notification title
 * @param {string} options.body - Notification body
 * @param {number} options.hour - Hour to trigger (0-23)
 * @param {number} options.minute - Minute to trigger (0-59)
 * @returns {Promise<string>} Notification identifier
 */
export const scheduleDailyReminder = async ({ title, body, hour, minute }) => {
    // Check if daily reminders are enabled
    const dailyRemindersEnabled = await AsyncStorage.getItem(
        "dailyRemindersEnabled"
    );
    if (dailyRemindersEnabled === "false") {
        return null;
    }

    return await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
            data: { type: "dailyReminder" },
        },
        trigger: {
            hour,
            minute,
            repeats: true,
        },
    });
};

/**
 * Schedule an achievement notification
 * @param {Object} options - Notification options
 * @param {string} options.title - Notification title
 * @param {string} options.body - Notification body
 * @param {Object} options.achievement - Achievement data
 * @returns {Promise<string>} Notification identifier
 */
export const scheduleAchievementNotification = async ({
    title,
    body,
    achievement,
}) => {
    // Check if achievement notifications are enabled
    const achievementAlertsEnabled = await AsyncStorage.getItem(
        "achievementAlertsEnabled"
    );
    if (achievementAlertsEnabled === "false") {
        return null;
    }

    return await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
            data: { type: "achievement", achievement },
        },
        trigger: null, // Show immediately
    });
};

/**
 * Cancel all scheduled notifications
 * @returns {Promise<void>}
 */
export const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
};

/**
 * Cancel a specific notification
 * @param {string} notificationId - Notification identifier
 * @returns {Promise<void>}
 */
export const cancelNotification = async (notificationId) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
};

/**
 * Get all scheduled notifications
 * @returns {Promise<Array>} Array of scheduled notifications
 */
export const getAllScheduledNotifications = async () => {
    return await Notifications.getAllScheduledNotificationsAsync();
};

export default {
    registerForPushNotificationsAsync,
    scheduleLocalNotification,
    scheduleDailyReminder,
    scheduleAchievementNotification,
    cancelAllNotifications,
    cancelNotification,
    getAllScheduledNotifications,
};
