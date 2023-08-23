import { Request, Response } from 'express';
import * as pokemonService from '../services/pokemon.service';

export const getPokemon = async (req: Request, res: Response) => {
  const name = req.params.name;

  try {
    const pokemon = await pokemonService.getPokemonByName(name);
    res.json(pokemon);
  } catch (error:any) {
    res.status(500).send(error.message);
  }
};
