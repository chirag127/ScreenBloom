import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import TimeSwapScreen from "../screens/TimeSwapScreen";
import AppBlockerScreen from "../screens/AppBlockerScreen";
import MiniGamesScreen from "../screens/MiniGamesScreen";
import QuotesScreen from "../screens/QuotesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MiniGameDetailScreen from "../screens/MiniGameDetailScreen";
import BlockedAppDetailScreen from "../screens/BlockedAppDetailScreen";
import GoalDetailScreen from "../screens/GoalDetailScreen";

// Import components
import NetworkStatus from "../components/NetworkStatus";

// Import context
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNetwork } from "../context/NetworkContext";

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigator
const AuthNavigator = () => {
    const { theme } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.primary,
                },
                headerTintColor: theme.background,
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "Sign In" }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: "Create Account" }}
            />
        </Stack.Navigator>
    );
};

// Main Tab Navigator
const MainTabNavigator = () => {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "TimeSwap") {
                        iconName = focused ? "time" : "time-outline";
                    } else if (route.name === "AppBlocker") {
                        iconName = focused ? "shield" : "shield-outline";
                    } else if (route.name === "MiniGames") {
                        iconName = focused
                            ? "game-controller"
                            : "game-controller-outline";
                    } else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline";
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: theme.muted,
                tabBarStyle: {
                    backgroundColor: theme.background,
                    borderTopColor: theme.border,
                },
                headerStyle: {
                    backgroundColor: theme.primary,
                },
                headerTintColor: theme.background,
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Dashboard" }}
            />
            <Tab.Screen
                name="TimeSwap"
                component={TimeSwapScreen}
                options={{ title: "Time Swap" }}
            />
            <Tab.Screen
                name="AppBlocker"
                component={AppBlockerScreen}
                options={{ title: "App Blocker" }}
            />
            <Tab.Screen
                name="MiniGames"
                component={MiniGamesScreen}
                options={{ title: "Mini Games" }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: "Settings" }}
            />
        </Tab.Navigator>
    );
};

// Main App Navigator
const AppNavigator = () => {
    const { isAuthenticated, loading } = useAuth();
    const { theme } = useTheme();

    if (loading) {
        // You could return a loading screen here
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer
                theme={{
                    dark: theme === "dark",
                    colors: {
                        primary: theme.primary,
                        background: theme.background,
                        card: theme.card,
                        text: theme.text,
                        border: theme.border,
                        notification: theme.notification,
                    },
                }}
            >
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {!isAuthenticated ? (
                        <Stack.Screen name="Auth" component={AuthNavigator} />
                    ) : (
                        <>
                            <Stack.Screen
                                name="Main"
                                component={MainTabNavigator}
                            />
                            <Stack.Screen
                                name="MiniGameDetail"
                                component={MiniGameDetailScreen}
                                options={{
                                    headerShown: true,
                                    title: "Mini Game",
                                    headerStyle: {
                                        backgroundColor: theme.primary,
                                    },
                                    headerTintColor: theme.background,
                                }}
                            />
                            <Stack.Screen
                                name="BlockedAppDetail"
                                component={BlockedAppDetailScreen}
                                options={{
                                    headerShown: true,
                                    title: "App Settings",
                                    headerStyle: {
                                        backgroundColor: theme.primary,
                                    },
                                    headerTintColor: theme.background,
                                }}
                            />
                            <Stack.Screen
                                name="GoalDetail"
                                component={GoalDetailScreen}
                                options={{
                                    headerShown: true,
                                    title: "Goal Details",
                                    headerStyle: {
                                        backgroundColor: theme.primary,
                                    },
                                    headerTintColor: theme.background,
                                }}
                            />
                            <Stack.Screen
                                name="Quotes"
                                component={QuotesScreen}
                                options={{
                                    headerShown: true,
                                    title: "Inspirational Quotes",
                                    headerStyle: {
                                        backgroundColor: theme.primary,
                                    },
                                    headerTintColor: theme.background,
                                }}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
            <NetworkStatus />
        </View>
    );
};

export default AppNavigator;
