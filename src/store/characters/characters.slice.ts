import { Character } from "@/characters";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharacterState {
    items: Character[]; 
    favorites: Character[]; 
    characterSelected: Character | null;
    loading: boolean;
    error: string | null;
}

const initialState: CharacterState = {
  items: [],
  favorites: [],
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
  const res = await fetch(`/api/characters/${id}/favorite`, {
    method: "PATCH",
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
    setFavoriteLocal(state, action: PayloadAction<{ id: number; isFavorite: boolean }>) {
      const item = state.items.find((x) => x.id === action.payload.id);
      if (item) item.isFavorite = action.payload.isFavorite;
    },
    setSelected(state, action: PayloadAction<{ character: Character }>) {
      state.characterSelected = action.payload.character;
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
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to update favorite";
      });
  },

});

export const { setFavoriteLocal, setSelected } = charactersSlice.actions;
export default charactersSlice.reducer;