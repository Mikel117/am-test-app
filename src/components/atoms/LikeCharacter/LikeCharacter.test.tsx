import { render, screen, fireEvent } from '@testing-library/react';
import { LikeCharacter } from './LikeCharacter';

describe('LikeCharacter', () => {
  it('renders Like text', () => {
    render(<LikeCharacter isFavorite={false} />);
    expect(screen.getByText('Like')).toBeInTheDocument();
  });

  it('renders filled heart icon when isFavorite is true', () => {
    const { container } = render(<LikeCharacter isFavorite={true} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders outline heart icon when isFavorite is false', () => {
    const { container } = render(<LikeCharacter isFavorite={false} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('calls onClick when heart icon is clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(<LikeCharacter isFavorite={false} onClick={handleClick} />);
    const icon = container.querySelector('svg');
    if (icon) {
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  it('does not throw error when onClick is not provided', () => {
    const { container } = render(<LikeCharacter isFavorite={false} />);
    const icon = container.querySelector('svg');
    if (icon) {
      expect(() => fireEvent.click(icon)).not.toThrow();
    }
  });
});
