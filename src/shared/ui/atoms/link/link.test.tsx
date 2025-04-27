import { render, screen } from '@testing-library/react';
import { Link } from './link';
import { MemoryRouter } from 'react-router-dom';

describe('Link', () => {
  it('Match Snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Link to="#">Test</Link>
      </MemoryRouter>,
    );

    expect(screen.getByText('Test')).toHaveTextContent('Test');

    expect(container).toMatchSnapshot();
  });

  it('Rendered', () => {
    render(
      <MemoryRouter>
        <Link to="#">Test</Link>
      </MemoryRouter>,
    );

    const element = screen.getByText('Test');

    expect(element).toBeInTheDocument();
  });
});
