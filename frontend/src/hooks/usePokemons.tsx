import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Pokemon {
  label: string;
  value: string;
}

const usePokemons = () => {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemons = response.data.results.map((pokemon: any, index: number) => ({
          label: pokemon.name,
          value: String(index + 1),
        }));
        setAllPokemons(pokemons);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return [allPokemons, loading] as const;
};

export default usePokemons;
