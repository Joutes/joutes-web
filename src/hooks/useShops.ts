import { useState, useEffect } from 'react';
import { getShops } from '@/pages/PublicPages/Home/services/shopsService';
import type { Shop } from '../pages/PublicPages/Home/types/shop';

export const useShops = () => {
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getShops().then(data => {
            setShops(data);
            setLoading(false);
        });
    }, []);

    const getShopById = (id: number) => {
        return shops.find(s => s.id === id);
    };

    return { shops, loading, getShopById };
};
