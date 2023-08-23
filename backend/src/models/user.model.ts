import mongoose, { Document, Schema } from 'mongoose';

interface IFavoritePokemon {
    name: string;
    id?: number;
    image?: string
}

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    isVerified: boolean,
    verifyToken: string | undefined,
    favoritePokemons: IFavoritePokemon[];
}

const pokemonFavoriteSchema = new Schema<IFavoritePokemon>({
    name: { type: String, required: true },
    id: { type: Number, required: false },
    image: { type: String, required: false },
});

const userSchema = new Schema<IUser>({
    username: String,
    email: { type: String, required: true },
    password: String,
    isVerified: { type: Boolean, default: false },
    verifyToken: String,
    favoritePokemons: { type: [pokemonFavoriteSchema], default: [] },
});

export const User = mongoose.model<IUser>('User', userSchema);
