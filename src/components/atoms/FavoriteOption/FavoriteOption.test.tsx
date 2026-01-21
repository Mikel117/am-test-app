import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteOption } from './FavoriteOption';

describe('FavoriteOption', () => {
  const defaultProps = {
    name: 'Rick Sanchez',
    id: 1,
  };

  it('renders character name', () => {
    render(<FavoriteOption {...defaultProps} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('renders delete icon', () => {
    const { container } = render(<FavoriteOption {...defaultProps} />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('calls onClick when list item is clicked', () => {
    const handleClick = jest.fn();
    render(<FavoriteOption {...defaultProps} onClick={handleClick} />);
    fireEvent.click(screen.getByText('Rick Sanchez'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when trash icon is clicked', () => {
    const handleDelete = jest.fn();
    const { container } = render(<FavoriteOption {...defaultProps} onDelete={handleDelete} />);
    const deleteIcon = container.querySelector('svg');
    if (deleteIcon) {
      fireEvent.click(deleteIcon);
      expect(handleDelete).toHaveBeenCalledTimes(1);
    }
  });

  it('stops propagation when delete icon is clicked', () => {
    const handleClick = jest.fn();
    const handleDelete = jest.fn();
    const { container } = render(
      <FavoriteOption {...defaultProps} onClick={handleClick} onDelete={handleDelete} />
    );
    const deleteIcon = container.querySelector('svg');
    if (deleteIcon) {
      fireEvent.click(deleteIcon);
      expect(handleDelete).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    }
  });
});
