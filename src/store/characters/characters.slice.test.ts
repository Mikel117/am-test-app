import { configureStore } from '@reduxjs/toolkit';
import {
  charactersSlice,
  setSelected,
  setFilteredCharacters,
  selectNextCharacter,
  selectPreviousCharacter,
  fetchCharacters,
  toggleFavorite,
} from './characters.slice';
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
    isFavorite: true,
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
];

describe('charactersSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        characters: charactersSlice.reducer,
      },
    });
  });

  describe('reducers', () => {
    it('should handle setSelected', () => {
      const character = mockCharacters[0];
      store.dispatch(setSelected({ character }));
      const state = store.getState().characters;
      expect(state.characterSelected).toEqual(character);
    });

    it('should handle setFilteredCharacters', () => {
      const characters = mockCharacters;
      store.dispatch(setFilteredCharacters({ characters }));
      const state = store.getState().characters;
      expect(state.filteredCharacters).toEqual(characters);
    });

    it('should handle selectNextCharacter', () => {
      store.dispatch(setSelected({ character: mockCharacters[0] }));
      store.dispatch(selectNextCharacter({ filteredCharacters: mockCharacters }));
      const state = store.getState().characters;
      expect(state.characterSelected?.id).toBe(2);
    });

    it('should not select next character when at the end', () => {
      store.dispatch(setSelected({ character: mockCharacters[2] }));
      store.dispatch(selectNextCharacter({ filteredCharacters: mockCharacters }));
      const state = store.getState().characters;
      expect(state.characterSelected?.id).toBe(3);
    });

    it('should handle selectPreviousCharacter', () => {
      store.dispatch(setSelected({ character: mockCharacters[1] }));
      store.dispatch(selectPreviousCharacter({ filteredCharacters: mockCharacters }));
      const state = store.getState().characters;
      expect(state.characterSelected?.id).toBe(1);
    });

    it('should not select previous character when at the beginning', () => {
      store.dispatch(setSelected({ character: mockCharacters[0] }));
      store.dispatch(selectPreviousCharacter({ filteredCharacters: mockCharacters }));
      const state = store.getState().characters;
      expect(state.characterSelected?.id).toBe(1);
    });

    it('should not navigate when characterSelected is null', () => {
      store.dispatch(selectNextCharacter({ filteredCharacters: mockCharacters }));
      const state = store.getState().characters;
      expect(state.characterSelected).toBeNull();
    });

    it('should not navigate when filteredCharacters is empty', () => {
      store.dispatch(setSelected({ character: mockCharacters[0] }));
      store.dispatch(selectNextCharacter({ filteredCharacters: [] }));
      const state = store.getState().characters;
      expect(state.characterSelected?.id).toBe(1);
    });
  });

  describe('extraReducers', () => {
    it('should handle fetchCharacters.pending', () => {
      store.dispatch(fetchCharacters.pending('', undefined, {} as any));
      const state = store.getState().characters;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchCharacters.fulfilled', () => {
      store.dispatch(
        fetchCharacters.fulfilled(mockCharacters, '', undefined, {} as any)
      );
      const state = store.getState().characters;
      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockCharacters);
      expect(state.favorites).toEqual([mockCharacters[1]]);
    });

    it('should handle fetchCharacters.rejected', () => {
      const error = new Error('Failed to fetch');
      store.dispatch(
        fetchCharacters.rejected(error, '', undefined, {} as any)
      );
      const state = store.getState().characters;
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch');
    });

    it('should handle toggleFavorite.fulfilled', () => {
      store.dispatch(
        fetchCharacters.fulfilled(mockCharacters, '', undefined, {} as any)
      );
      store.dispatch(
        toggleFavorite.fulfilled({ id: 1, isFavorite: true }, '', { id: 1, isFavorite: true }, {} as any)
      );
      const state = store.getState().characters;
      const updatedCharacter = state.items.find((c) => c.id === 1);
      expect(updatedCharacter?.isFavorite).toBe(true);
      expect(state.favorites.length).toBe(2);
    });

    it('should update favorites list when toggling favorite off', () => {
      store.dispatch(
        fetchCharacters.fulfilled(mockCharacters, '', undefined, {} as any)
      );
      store.dispatch(
        toggleFavorite.fulfilled({ id: 2, isFavorite: false }, '', { id: 2, isFavorite: false }, {} as any)
      );
      const state = store.getState().characters;
      expect(state.favorites.length).toBe(0);
    });
  });
});
