import React, { createContext, useState, useEffect, useContext } from "react";
import networkService from "../services/networkService";
import storageService from "../services/storageService";

// Create the context
const NetworkContext = createContext();

// Custom hook to use the network context
export const useNetwork = () => {
    return useContext(NetworkContext);
};

// Provider component
export const NetworkProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [offlineActions, setOfflineActions] = useState([]);

    // Initialize network monitoring
    useEffect(() => {
        const unsubscribe = networkService.initNetworkMonitoring();

        // Add listener for network state changes
        const removeListener = networkService.addNetworkListener(
            (connected) => {
                setIsConnected(connected);

                // If we just came back online, check for offline actions
                if (connected) {
                    loadOfflineActions();
                }
            }
        );

        // Initial check
        networkService.isNetworkConnected().then((connected) => {
            setIsConnected(connected);
        });

        // Load offline actions
        loadOfflineActions();

        return () => {
            unsubscribe();
            removeListener();
        };
    }, []);

    // Load offline actions from storage
    const loadOfflineActions = async () => {
        const actions = await storageService.getOfflineActions();
        setOfflineActions(actions || []);
    };

    // Sync offline actions with the server
    const syncOfflineActions = async () => {
        if (!isConnected || isSyncing || offlineActions.length === 0) {
            return;
        }

        try {
            setIsSyncing(true);
            await networkService.syncOfflineActions();
            await loadOfflineActions();
        } catch (error) {
            console.error("Error syncing offline actions:", error);
        } finally {
            setIsSyncing(false);
        }
    };

    // Add an offline action
    const addOfflineAction = async (action) => {
        await storageService.addOfflineAction(action);
        await loadOfflineActions();
    };

    // Execute an API call with offline support
    const executeWithOfflineSupport = async (apiCall, offlineAction) => {
        const result = await networkService.executeWithOfflineSupport(
            apiCall,
            offlineAction
        );

        // Reload offline actions if we added one
        if (!isConnected && offlineAction) {
            await loadOfflineActions();
        }

        return result;
    };

    // Context value
    const value = {
        isConnected,
        isSyncing,
        offlineActions,
        syncOfflineActions,
        addOfflineAction,
        executeWithOfflineSupport,
    };

    return (
        <NetworkContext.Provider value={value}>
            {children}
        </NetworkContext.Provider>
    );
};

export default NetworkContext;
