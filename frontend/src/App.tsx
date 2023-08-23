import { useState } from 'react';
import FavoritePokemons from './components/FavoritePokemons';
import UserProfile from './components/UserProfile';
import { PokemonSelectItem } from './components/SearchPokemon';
import useAuth from './hooks/useAuth'; // Asegúrate de importar useAuth desde la ubicación correcta
import Login from './components/Login';
import usePokemons from './hooks/usePokemons';
import api from './utils/api';
import useFavoritePokemon from './hooks/useFavoritePokemon';

function App() {
  const [user, login, logout] = useAuth();
  const [favoritePokemons, refresh] = useFavoritePokemon(user?._id);
  const [allPokemons, loading] = usePokemons();

  // const handleSelectedItemsChange = (selectedItems?: PokemonSelectItem[]) => {
  //   if (selectedItems && selectedItems.length > 0) {
  //     const selectedPokemon = selectedItems[0];

  //     if (favoritePokemons.some(pokemon => pokemon.name === selectedPokemon.label)) {
  //       return;
  //     }

  //     const newFavoritePokemon = {
  //       name: selectedPokemon.label,
  //       image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.value}.png`,
  //     };
  //     setFavoritePokemons([...favoritePokemons, newFavoritePokemon]);
  //   }
  // };

  const handleSelectedItemsChange = async (selectedItems?: PokemonSelectItem[]) => {
    if (selectedItems && selectedItems.length > 0) {
      const selectedPokemon = selectedItems[0];
  
      if (favoritePokemons.some(pokemon => pokemon.name === selectedPokemon.label)) {
        return;
      }
  
      const newFavoritePokemon = {
        name: selectedPokemon.label,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.value}.png`,
        id: Number.parseInt(selectedPokemon.value),
        userId: user?._id
      };
  
      try {
        await api.post(`/users/favorites`, newFavoritePokemon);
        refresh();
      } catch (error) {
        console.error('Error al agregar el Pokémon a los favoritos:', error);
      }
    }
  };
  

  return (
    <div className="h-screen bg-red-100 flex justify-center items-center">
      {!user &&  <Login onLogin={login} />}
      {user && (
        <div className="container max-w-screen-lg mx-auto bg-white rounded-md shadow-lg flex flex-col md:flex-row p-8">
          <UserProfile user={user} onLogout={logout}/>          
          {loading ? <>loading...</> : <FavoritePokemons
            favoritePokemons={favoritePokemons}
            allPokemons={allPokemons}
            onSelect={handleSelectedItemsChange}
          />}
          
        </div>
      )}
    </div>
  );
}

export default App;
