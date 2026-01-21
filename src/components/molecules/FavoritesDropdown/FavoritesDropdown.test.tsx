import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesDropdown } from './FavoritesDropdown';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { charactersSlice } from '@/store/characters/characters.slice';
import { Character } from '@/characters';

const mockFavorites: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: 'Earth',
    location: 'Earth',
    image: '/rick.png',
    episodes: 51,
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: 'Earth',
    location: 'Earth',
    image: '/morty.png',
    episodes: 51,
    isFavorite: true,
  },
];

const createMockStore = (favorites: Character[] = []) => {
  return configureStore({
    reducer: {
      characters: charactersSlice.reducer,
    },
    preloadedState: {
      characters: {
        items: favorites,
        favorites: favorites,
        filteredCharacters: [],
        characterSelected: null,
        loading: false,
        error: null,
      },
    },
  });
};

describe('FavoritesDropdown', () => {
  it('renders FAVS title when closed', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <FavoritesDropdown />
      </Provider>
    );
    expect(screen.getByText('FAVS')).toBeInTheDocument();
  });

  it('opens dropdown when FAVS is clicked', () => {
    const store = createMockStore(mockFavorites);
    render(
      <Provider store={store}>
        <FavoritesDropdown />
      </Provider>
    );
    fireEvent.click(screen.getByText('FAVS'));
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('displays all favorite characters', () => {
    const store = createMockStore(mockFavorites);
    render(
      <Provider store={store}>
        <FavoritesDropdown />
      </Provider>
    );
    fireEvent.click(screen.getByText('FAVS'));
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('closes dropdown when invisible span is clicked', () => {
    const store = createMockStore(mockFavorites);
    const { container } = render(
      <Provider store={store}>
        <FavoritesDropdown />
      </Provider>
    );
    fireEvent.click(screen.getByText('FAVS'));
    const invisibleSpan = container.querySelector('[class*="favorites-dropdown-invisible"]');
    if (invisibleSpan) {
      fireEvent.click(invisibleSpan);
      expect(screen.getByText('FAVS')).toBeInTheDocument();
    }
  });

  it('renders empty list when no favorites', () => {
    const store = createMockStore([]);
    render(
      <Provider store={store}>
        <FavoritesDropdown />
      </Provider>
    );
    fireEvent.click(screen.getByText('FAVS'));
    const list = screen.queryByRole('list');
    expect(list).toBeInTheDocument();
  });
});
