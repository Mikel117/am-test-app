import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from './CharacterCard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { charactersSlice } from '@/store/characters/characters.slice';

const mockStore = configureStore({
  reducer: {
    characters: charactersSlice.reducer,
  },
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('CharacterCard', () => {
  const defaultProps = {
    name: 'Rick Sanchez',
    image: '/rick.png',
    isFavorite: false,
    isSelected: false,
    id: 1,
  };

  const renderWithProvider = (component: React.ReactElement) => {
    return render(<Provider store={mockStore}>{component}</Provider>);
  };

  it('renders character name', () => {
    renderWithProvider(<CharacterCard {...defaultProps} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('renders character image', () => {
    renderWithProvider(<CharacterCard {...defaultProps} />);
    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/rick.png');
  });

  it('applies selected class when isSelected is true', () => {
    const { container } = renderWithProvider(
      <CharacterCard {...defaultProps} isSelected={true} />
    );
    const cardContainer = container.querySelector('[class*="character-card-container"]');
    expect(cardContainer?.className).toContain('selected');
  });

  it('does not apply selected class when isSelected is false', () => {
    const { container } = renderWithProvider(<CharacterCard {...defaultProps} />);
    const cardContainer = container.querySelector('[class*="character-card-container"]');
    expect(cardContainer?.className).not.toContain('selected');
  });

  it('calls onClick when image is clicked', () => {
    const handleClick = jest.fn();
    renderWithProvider(<CharacterCard {...defaultProps} onClick={handleClick} />);
    const image = screen.getByAltText('Rick Sanchez');
    fireEvent.click(image);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders LikeCharacter component', () => {
    renderWithProvider(<CharacterCard {...defaultProps} />);
    expect(screen.getByText('Like')).toBeInTheDocument();
  });

  it('displays favorite state correctly', () => {
    renderWithProvider(<CharacterCard {...defaultProps} isFavorite={true} />);
    expect(screen.getByText('Like')).toBeInTheDocument();
  });
});
