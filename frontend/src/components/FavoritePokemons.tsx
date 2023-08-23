import { Box, Heading, Image, Text } from '@chakra-ui/react';
import SearchPokemon, { PokemonSelectItem } from './SearchPokemon';

interface FavoritePokemonsProps {
  favoritePokemons: {
    name: string;
    image?: string;
    id?: number;
  }[];
  allPokemons: PokemonSelectItem[];
  onSelect: (selectedItems?: PokemonSelectItem[]) => void;
}

const FavoritePokemons: React.FC<FavoritePokemonsProps> = ({ favoritePokemons, allPokemons, onSelect }) => {
  return (
    <Box className="md:w-2/3 mt-8 md:mt-0 md:ml-8" maxH="80vh" overflowY="auto">
      <Heading mb={4} className="text-2xl text-red-600">Pokémon Favoritos</Heading>
      <Box className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {favoritePokemons.map((pokemon, index) => (
          <Box key={index} p={4} bg="red-200" borderRadius="md" shadow="sm" className="flex items-center">
            <Image boxSize="50px" src={pokemon.image} alt={pokemon.name} />
            <Text ml={4} className="text-lg text-red-600">{pokemon.name}</Text>
          </Box>
        ))}
      </Box>
      <SearchPokemon
        allPokemons={allPokemons.filter(p => !favoritePokemons.some(fp => fp.name === p.label))}
        onSelect={onSelect}
      />
    </Box>
  );
};

export default FavoritePokemons;
