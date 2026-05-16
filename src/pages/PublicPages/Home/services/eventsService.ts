import type {UpcomingEvent, FollowedEvent} from '../types/events';
import api from '@/services/api';

let upcomingPromise: Promise<UpcomingEvent[]> | null = null;
let followedPromise: Promise<FollowedEvent[]> | null = null;

export const getUpcomingEvents = async (): Promise<UpcomingEvent[]> => {
    if (upcomingPromise) {
        return upcomingPromise;
    }

    upcomingPromise = api.get<UpcomingEvent[]>('/events/upcoming')
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur lors de la récupération des événements à venir:", error);
            return [];
        })
        .finally(() => {
            upcomingPromise = null;
        });

    return upcomingPromise;
};

export const getFollowedEvents = async (): Promise<FollowedEvent[]> => {
    if (followedPromise) {
        return followedPromise;
    }

    followedPromise = api.get<FollowedEvent[]>('/events/followed')
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur lors de la récupération des événements suivis:", error);
            return [];
        })
        .finally(() => {
            followedPromise = null;
        });

    return followedPromise;
};
