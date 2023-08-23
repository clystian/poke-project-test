import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import * as userService from '../services/user.service';
import { SECRET_KEY } from '../config';

export const getUsers = async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.json(users);
};

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const user = await userService.createUser(username, email, password);
        res.status(201).json({ message: 'User created. Please verify your email.' });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const verify = async (req: Request, res: Response) => {
    const token = req.query.token as string;

    try {
        await userService.verifyEmail(token);
        res.status(200).send('Email verified successfully');
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password ?? "")) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.json({ token });
};

export const addFavoritePokemon = async (req: Request, res: Response) => {
    const userId = req.body.userId || req.userId;
    const pokemon = { name: req.body.name, id: req.body.id, image: req.body.image };

    try {
        const isAdded = await userService.addFavoritePokemon(userId, pokemon);
        if (isAdded) {
            res.status(201).send('Pokémon added to favorites');
        } else {
            res.status(200).send('Pokémon already in favorites');
        }
    } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message);
    }
};

export const getFavoritePokemons = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const favoritePokemons = await userService.getFavoritePokemons(userId);
        res.json(favoritePokemons);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};




