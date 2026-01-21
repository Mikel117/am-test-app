import { render } from '@testing-library/react';
import { TitleImage } from './TitleImage';

describe('TitleImage', () => {
  it('renders without crashing', () => {
    const { container } = render(<TitleImage />);
    expect(container).toBeInTheDocument();
  });

  it('renders image element', () => {
    const { container } = render(<TitleImage />);
    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
  });
});
