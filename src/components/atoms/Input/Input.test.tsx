import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders input with placeholder', () => {
    render(<Input value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Buscar personaje...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<Input value="" onChange={() => {}} placeholder="Custom placeholder" />);
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('displays current value', () => {
    render(<Input value="Rick" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Rick');
  });

  it('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Morty' } });
    expect(handleChange).toHaveBeenCalledWith('Morty');
  });

  it('renders search icon', () => {
    const { container } = render(<Input value="" onChange={() => {}} />);
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThanOrEqual(2);
  });
});
