import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from "react-native";
import { useNetwork } from "../context/NetworkContext";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const NetworkStatus = () => {
    const { isConnected, isSyncing, offlineActions, syncOfflineActions } =
        useNetwork();
    const { theme } = useTheme();

    const [visible, setVisible] = useState(false);
    const translateY = new Animated.Value(-60);

    useEffect(() => {
        if (!isConnected || (isConnected && offlineActions.length > 0)) {
            setVisible(true);
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: -60,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setVisible(false);
            });
        }
    }, [isConnected, offlineActions.length]);

    if (!visible) {
        return null;
    }

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: isConnected ? theme.success : theme.error,
                    transform: [{ translateY }],
                },
            ]}
        >
            <View style={styles.content}>
                <Ionicons
                    name={
                        isConnected
                            ? "cloud-done-outline"
                            : "cloud-offline-outline"
                    }
                    size={20}
                    color="#fff"
                />
                <Text style={styles.text}>
                    {isConnected
                        ? offlineActions.length > 0
                            ? `Online - ${offlineActions.length} actions pending`
                            : "Online"
                        : "Offline - Changes will be saved locally"}
                </Text>
            </View>

            {isConnected && offlineActions.length > 0 && (
                <TouchableOpacity
                    style={styles.syncButton}
                    onPress={syncOfflineActions}
                    disabled={isSyncing}
                >
                    <Ionicons
                        name={isSyncing ? "sync-circle" : "sync"}
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        paddingTop: 30,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 999,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        marginLeft: 10,
        fontWeight: "bold",
    },
    syncButton: {
        padding: 5,
    },
});

export default NetworkStatus;
