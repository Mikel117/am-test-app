import { render, screen } from '@testing-library/react';
import { Information } from './Information';

describe('Information', () => {
  it('renders title', () => {
    render(<Information title="Origin" description="Earth" />);
    expect(screen.getByRole('heading', { name: 'Origin' })).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Information title="Origin" description="Earth" />);
    expect(screen.getByText('Earth')).toBeInTheDocument();
  });

  it('renders both title and description', () => {
    render(<Information title="Location" description="Citadel of Ricks" />);
    expect(screen.getByRole('heading', { name: 'Location' })).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
  });

  it('renders empty strings correctly', () => {
    render(<Information title="" description="" />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('');
  });
});
