// services/pokemon.service.ts
import axios from 'axios';
import { PokemonResponse } from './pokemon.types';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonByName = async (name: string):Promise<PokemonResponse> => {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Pokémon');
  }
};

