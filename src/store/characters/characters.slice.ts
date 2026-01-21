import { Character } from "@/characters";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharacterState {
    items: Character[]; 
    favorites: Character[];
    filteredCharacters: Character[];
    characterSelected: Character | null;
    loading: boolean;
    error: string | null;
}

const initialState: CharacterState = {
  items: [],
  favorites: [],
  filteredCharacters: [],
  characterSelected: null,
  loading: false,
  error: null,
};

export const fetchCharacters = createAsyncThunk<Character[]>(
  "characters/fetchAll",
  async () => {
    const res = await fetch("/api/characters");
    if (!res.ok) throw new Error("Failed to fetch characters");
    return res.json();
  }
);

export const toggleFavorite = createAsyncThunk<
  { id: number; isFavorite: boolean },
  { id: number; isFavorite: boolean }
>("characters/toggleFavorite", async ({ id, isFavorite }) => {
  const res = await fetch(`/api/characters/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isFavorite }),
  });
  if (!res.ok) throw new Error("Failed to update favorite");
  return { id, isFavorite };
});

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setSelected(state, action: PayloadAction<{ character: Character }>) {
      state.characterSelected = action.payload.character;
    },
    setFilteredCharacters(state, action: PayloadAction<{ characters: Character[] }>) {
      state.filteredCharacters = action.payload.characters;
    },
    selectNextCharacter(state, action: PayloadAction<{ filteredCharacters: Character[] }>) {
      const { filteredCharacters } = action.payload;
      if (!state.characterSelected || filteredCharacters.length === 0) return;
      
      const currentIndex = filteredCharacters.findIndex(
        (c) => c.id === state.characterSelected?.id
      );
      
      if (currentIndex !== -1 && currentIndex < filteredCharacters.length - 1) {
        state.characterSelected = filteredCharacters[currentIndex + 1];
      }
    },
    selectPreviousCharacter(state, action: PayloadAction<{ filteredCharacters: Character[] }>) {
      const { filteredCharacters } = action.payload;
      if (!state.characterSelected || filteredCharacters.length === 0) return;
      
      const currentIndex = filteredCharacters.findIndex(
        (c) => c.id === state.characterSelected?.id
      );
      
      if (currentIndex > 0) {
        state.characterSelected = filteredCharacters[currentIndex - 1];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.favorites = action.payload.filter((c) => c.isFavorite);
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const item = state.items.find((x) => x.id === action.payload.id);
        if (item) {
          item.isFavorite = action.payload.isFavorite;
          // Actualizar la lista de favoritos
          state.favorites = state.items.filter((c) => c.isFavorite);
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to update favorite";
      });
  },

});

  export const { setSelected, setFilteredCharacters, selectNextCharacter, selectPreviousCharacter } = charactersSlice.actions;
export default charactersSlice.reducer;