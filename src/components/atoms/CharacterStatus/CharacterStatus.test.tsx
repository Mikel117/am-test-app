import { render, screen } from '@testing-library/react';
import { CharacterStatus } from './CharacterStatus';

describe('CharacterStatus', () => {
  it('renders with Alive status', () => {
    render(<CharacterStatus status="Alive" />);
    expect(screen.getByText('Alive')).toBeInTheDocument();
  });

  it('renders with Dead status', () => {
    render(<CharacterStatus status="Dead" />);
    expect(screen.getByText('Dead')).toBeInTheDocument();
  });

  it('renders with unknown status', () => {
    render(<CharacterStatus status="unknown" />);
    expect(screen.getByText('unknown')).toBeInTheDocument();
  });

  it('renders status indicator', () => {
    const { container } = render(<CharacterStatus status="Alive" />);
    const statusIndicator = container.querySelector('div > div');
    expect(statusIndicator).toBeInTheDocument();
  });
});
