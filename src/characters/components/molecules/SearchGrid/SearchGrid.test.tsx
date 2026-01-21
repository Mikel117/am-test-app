import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchGrid } from './SearchGrid';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { charactersSlice } from '@/store/characters/characters.slice';
import { Character } from '@/characters';

const mockCharacters: Character[] = [
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
    isFavorite: false,
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
    isFavorite: false,
  },
  {
    id: 3,
    name: 'Summer Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Female',
    origin: 'Earth',
    location: 'Earth',
    image: '/summer.png',
    episodes: 42,
    isFavorite: false,
  },
  {
    id: 4,
    name: 'Beth Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Female',
    origin: 'Earth',
    location: 'Earth',
    image: '/beth.png',
    episodes: 42,
    isFavorite: false,
  },
  {
    id: 5,
    name: 'Jerry Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: 'Earth',
    location: 'Earth',
    image: '/jerry.png',
    episodes: 42,
    isFavorite: false,
  },
];

const createMockStore = (characters: Character[] = []) => {
  return configureStore({
    reducer: {
      characters: charactersSlice.reducer,
    },
    preloadedState: {
      characters: {
        items: characters,
        favorites: [],
        filteredCharacters: characters,
        characterSelected: null,
        loading: false,
        error: null,
      },
    },
  });
};

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('SearchGrid', () => {
  beforeEach(() => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
  });

  it('renders search input', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <SearchGrid />
      </Provider>
    );
    expect(screen.getByPlaceholderText('Buscar personaje...')).toBeInTheDocument();
  });

  it('displays characters', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <SearchGrid />
      </Provider>
    );
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('filters characters based on search term', async () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <SearchGrid />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Buscar personaje...');
    fireEvent.change(input, { target: { value: 'Rick' } });
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.queryByText('Morty Smith')).not.toBeInTheDocument();
    });
  });

  it('renders navigation buttons', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <SearchGrid />
      </Provider>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('displays correct number of characters per page', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <SearchGrid />
      </Provider>
    );
    const characterCards = screen.getAllByText(/Smith|Sanchez/);
    expect(characterCards.length).toBeLessThanOrEqual(4);
  });

  it('handles empty search results', async () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <SearchGrid />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Buscar personaje...');
    fireEvent.change(input, { target: { value: 'NonExistentCharacter' } });
    await waitFor(() => {
      expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();
    });
  });

  it('resets to first page when searching', async () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <SearchGrid />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Buscar personaje...');
    fireEvent.change(input, { target: { value: 'Smith' } });
    await waitFor(() => {
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });

  it('renders FavoritesDropdown component', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <SearchGrid />
      </Provider>
    );
    expect(screen.getByText('FAVS')).toBeInTheDocument();
  });
});
