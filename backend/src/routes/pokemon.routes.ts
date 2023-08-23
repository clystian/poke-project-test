import express from 'express';
import * as pokemonController from '../controllers/pokemon.controller';

const router = express.Router();

router.get('/pokemon/:name', pokemonController.getPokemon);

export default router;
