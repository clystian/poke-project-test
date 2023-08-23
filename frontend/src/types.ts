export interface IFavoritePokemon {
    name: string;
    image?: string;
    id?: number;
}

export interface IUser {
    _id?: any
    username: string,
    email: string,
    password: string,
    avatar?: string | undefined,
    isVerified: boolean,
    verifyToken: string | undefined,
    favoritePokemons: IFavoritePokemon[];
}

export interface TokenPayload {
    userId: string;
}