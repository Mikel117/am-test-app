import { render, screen } from '@testing-library/react';
import { LoadingState } from './LoadingState';

describe('LoadingState Component', () => {
  it('should render with default loading message', () => {
    render(<LoadingState />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    render(<LoadingState message="Cargando personajes..." />);
    expect(screen.getByText('Cargando personajes...')).toBeInTheDocument();
  });

  it('should render error type correctly', () => {
    render(<LoadingState message="Error al cargar" type="error" />);
    const element = screen.getByText('Error al cargar');
    expect(element).toBeInTheDocument();
    expect(element.className).toContain('error');
  });

  it('should render info type correctly', () => {
    render(<LoadingState message="No hay datos" type="info" />);
    const element = screen.getByText('No hay datos');
    expect(element).toBeInTheDocument();
    expect(element.className).toContain('info');
  });
});
