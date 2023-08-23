import { IUser, User } from '../models/user.model';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from './email.service';

export const createUser = async (username: string, email: string, password: string): Promise<IUser> => {

    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
        throw new Error('Email already in use');
    }

    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
        throw new Error('Username already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de rondas de salting
    const verifyToken = crypto.randomBytes(16).toString('hex');
    const user = new User({ username, email, password: hashedPassword, verifyToken });
    await user.save();

    await sendVerificationEmail(email, verifyToken);

    return user;
};

export const verifyEmail = async (token: string) => {
    const user = await User.findOne({ verifyToken: token });
    if (!user) throw new Error('Invalid token');

    user.isVerified = true;
    user.verifyToken = undefined;
    await user.save();
};

export const getAllUsers = async () => {
    return await User.find();
};

export const addFavoritePokemon = async (userId: string, pokemon: { name: string, id?: number, image?:string }) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    if (!user.favoritePokemons) {
        user.favoritePokemons = [];
    }
    console.dir({ userId, pokemon, user, favorites: [...user.favoritePokemons] });
    if ([...user.favoritePokemons].some(fav => fav?.name === pokemon.name)) {
        return false;
    }

    user.favoritePokemons.push(pokemon);
    await user.save();
    return true;
};

export const getFavoritePokemons = async (userId: string) => {
    console.dir({userId, getFavoritePokemons})
    const user = await User.findById(userId).select('favoritePokemons');
    if (!user) throw new Error('User not found');

    return user.favoritePokemons;
};
