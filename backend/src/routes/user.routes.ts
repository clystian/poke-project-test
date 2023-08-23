import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/login', userController.login);
router.post('/users/favorites', userController.addFavoritePokemon);
router.get('/users/favorites/:userId', userController.getFavoritePokemons);
router.post('/register', userController.register);
router.get('/verify', userController.verify);

export default router;
