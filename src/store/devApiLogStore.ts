import { create } from 'zustand';

export interface ApiLog {
    id: string;
    method: string;
    url: string;
    status: number;
    duration: number;
    errorPayload?: any;
    timestamp: number;
}

interface DevApiLogState {
    logs: ApiLog[];
    addLog: (log: Omit<ApiLog, 'id' | 'timestamp'>) => void;
    removeLog: (id: string) => void;
}

export const useDevApiLogStore = create<DevApiLogState>((set) => ({
    logs: [],
    addLog: (logData) => {
        const id = Math.random().toString(36).substring(7);
        const timestamp = Date.now();
        const newLog = { ...logData, id, timestamp };
        
        set((state) => ({
            logs: [newLog, ...state.logs],
        }));

        // Suppression automatique après 30 secondes
        setTimeout(() => {
            set((state) => ({
                logs: state.logs.filter((log) => log.id !== id),
            }));
        }, 30000);
    },
    removeLog: (id) => set((state) => ({
        logs: state.logs.filter((log) => log.id !== id),
    })),
}));
