import { useEffect, useState } from "react";

const useNetworkStatus = () => {
    const [isOnline, setOnline] = useState<boolean>(true);

    const updateNetworkStatus = () => {
        if (window && window.navigator) {
            setOnline(navigator.onLine);
        }
    };

    useEffect(() => {
        window.addEventListener("load", updateNetworkStatus);
        window.addEventListener("online", updateNetworkStatus);
        window.addEventListener("offline", updateNetworkStatus);

        return () => {
            window.removeEventListener("load", updateNetworkStatus);
            window.removeEventListener("online", updateNetworkStatus);
            window.removeEventListener("offline", updateNetworkStatus);
        };
    }, [navigator.onLine]);

    return { isOnline };
};

export default useNetworkStatus;