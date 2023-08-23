import { Box, Flex } from '@chakra-ui/react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';

export interface PokemonSelectItem {
  label: string;
  value: string;
}

interface SearchPokemonProps {
  allPokemons: PokemonSelectItem[];
  onSelect: (selectedItems?: PokemonSelectItem[]) => void;
}

const SearchPokemon: React.FC<SearchPokemonProps> = ({ allPokemons, onSelect }) => {

  return (
    <Flex flexWrap="wrap" px={6} pt={12} bg="rgba(247,250,252)" justify="center" borderRight="1px solid #ddd">
      <Box maxH="300px" overflowY="auto"> {/* Contenedor con límites de desbordamiento */}
        <CUIAutoComplete
          disableCreateItem={true}
          items={allPokemons}
          label="Add your favorite Pokémon"
          placeholder="search pokemon by name"
          onSelectedItemsChange={(changes) => onSelect(changes.selectedItems)}
          selectedItems={[]}
        />
      </Box>
    </Flex>
  );
};

export default SearchPokemon;
