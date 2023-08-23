import { useState, useEffect } from 'react';
import api from '../utils/api';
import { IFavoritePokemon } from '../types';

const useFavoritePokemon = (userId: string | undefined) => {
    const [favoritePokemons, setFavoritePokemons] = useState<IFavoritePokemon[]>([]);
    const [loading, setLoading] = useState(false);

    const refresh = async () => {
        if (!userId) return;

        setLoading(true);
        try {
            console.log("test", userId, favoritePokemons, loading)
            const response = await api.get(`/users/favorites/${userId}`);
            setFavoritePokemons(response.data);
        } catch (error) {
            setFavoritePokemons([]);
            console.error('Error al obtener los Pokémon favoritos:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        refresh();
    }, [userId]);

    return [favoritePokemons, refresh, loading] as const;
};

export default useFavoritePokemon;
