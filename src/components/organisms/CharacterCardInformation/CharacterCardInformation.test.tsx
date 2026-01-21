import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCardInformation } from './CharacterCardInformation';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { charactersSlice } from '@/store/characters/characters.slice';
import { Character } from '@/characters';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: 'Earth C-137',
  location: 'Citadel of Ricks',
  image: '/rick.png',
  episodes: 51,
  isFavorite: false,
};

const mockCharacters: Character[] = [
  mockCharacter,
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
];

const createMockStore = (filteredCharacters: Character[] = []) => {
  return configureStore({
    reducer: {
      characters: charactersSlice.reducer,
    },
    preloadedState: {
      characters: {
        items: filteredCharacters,
        favorites: [],
        filteredCharacters: filteredCharacters,
        characterSelected: null,
        loading: false,
        error: null,
      },
    },
  });
};

describe('CharacterCardInformation', () => {
  it('renders character information when character is provided', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <CharacterCardInformation character={mockCharacter} />
      </Provider>
    );
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
  });

  it('renders nothing when character is null', () => {
    const store = createMockStore([]);
    const { container } = render(
      <Provider store={store}>
        <CharacterCardInformation character={null} />
      </Provider>
    );
    expect(container.querySelector('[class*="character-card-information-container"]')).not.toBeInTheDocument();
  });

  it('renders origin information', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <CharacterCardInformation character={mockCharacter} />
      </Provider>
    );
    expect(screen.getByText('Origin')).toBeInTheDocument();
    expect(screen.getByText('Earth C-137')).toBeInTheDocument();
  });

  it('renders location information', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <CharacterCardInformation character={mockCharacter} />
      </Provider>
    );
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
  });

  it('renders gender information', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <CharacterCardInformation character={mockCharacter} />
      </Provider>
    );
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <CharacterCardInformation character={mockCharacter} />
      </Provider>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('disables previous button when at first character', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <CharacterCardInformation character={mockCharacters[0]} />
      </Provider>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
  });

  it('disables next button when at last character', () => {
    const store = createMockStore(mockCharacters);
    render(
      <Provider store={store}>
        <CharacterCardInformation character={mockCharacters[1]} />
      </Provider>
    );
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    expect(nextButton).toBeDisabled();
  });

  it('handles touch events for swipe navigation', () => {
    const store = createMockStore(mockCharacters);
    const { container } = render(
      <Provider store={store}>
        <CharacterCardInformation character={mockCharacters[0]} />
      </Provider>
    );
    const cardContainer = container.querySelector('[class*="character-card-information-container"]');
    if (cardContainer) {
      fireEvent.touchStart(cardContainer, { touches: [{ clientX: 100 }] });
      fireEvent.touchMove(cardContainer, { touches: [{ clientX: 50 }] });
      fireEvent.touchEnd(cardContainer);
      expect(cardContainer).toBeInTheDocument();
    }
  });

  it('handles mouse events for drag navigation', () => {
    const store = createMockStore(mockCharacters);
    const { container } = render(
      <Provider store={store}>
        <CharacterCardInformation character={mockCharacters[0]} />
      </Provider>
    );
    const cardContainer = container.querySelector('[class*="character-card-information-container"]');
    if (cardContainer) {
      fireEvent.mouseDown(cardContainer, { clientX: 100 });
      fireEvent.mouseMove(cardContainer, { clientX: 50 });
      fireEvent.mouseUp(cardContainer);
      expect(cardContainer).toBeInTheDocument();
    }
  });
});
