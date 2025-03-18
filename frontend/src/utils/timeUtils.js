/**
 * Format minutes to hours and minutes
 * @param {number} minutes - Minutes to format
 * @returns {string} Formatted time string (e.g., "2h 30m" or "45m")
 */
export const formatMinutes = (minutes) => {
    if (!minutes && minutes !== 0) return "0m";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
        return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
};

/**
 * Format seconds to minutes and seconds
 * @param {number} seconds - Seconds to format
 * @returns {string} Formatted time string (e.g., "2m 30s" or "45s")
 */
export const formatSeconds = (seconds) => {
    if (!seconds && seconds !== 0) return "0s";

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
};

/**
 * Format seconds to MM:SS format
 * @param {number} seconds - Seconds to format
 * @returns {string} Formatted time string (e.g., "02:30" or "00:45")
 */
export const formatSecondsToMMSS = (seconds) => {
    if (!seconds && seconds !== 0) return "00:00";

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
};

/**
 * Get time difference between two dates in minutes
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {number} Time difference in minutes
 */
export const getTimeDifferenceInMinutes = (startDate, endDate) => {
    const diffMs = endDate - startDate;
    return Math.floor(diffMs / 60000);
};

/**
 * Check if two dates are on the same day
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {boolean} True if dates are on the same day
 */
export const isSameDay = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

/**
 * Get day of week name
 * @param {number} dayIndex - Day index (0-6, where 0 is Sunday)
 * @param {boolean} short - Whether to return short name
 * @returns {string} Day name
 */
export const getDayOfWeekName = (dayIndex, short = false) => {
    const days = [
        { long: "Sunday", short: "Sun" },
        { long: "Monday", short: "Mon" },
        { long: "Tuesday", short: "Tue" },
        { long: "Wednesday", short: "Wed" },
        { long: "Thursday", short: "Thu" },
        { long: "Friday", short: "Fri" },
        { long: "Saturday", short: "Sat" },
    ];

    if (dayIndex < 0 || dayIndex > 6) return "";

    return short ? days[dayIndex].short : days[dayIndex].long;
};
