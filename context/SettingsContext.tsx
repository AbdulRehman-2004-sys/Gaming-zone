"use client";

import { createContext, useContext, ReactNode } from "react";

const SettingsContext = createContext<any>(null);

export function SettingsProvider({
    settings,
    children
}: {
    settings: any;
    children: ReactNode
}) {
    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}
