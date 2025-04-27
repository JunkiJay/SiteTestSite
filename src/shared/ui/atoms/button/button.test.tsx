import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button component', () => {
  it('Renders correctly', () => {
    const { container } = render(<Button>Test</Button>);

    expect(screen.getByRole('button')).toHaveTextContent('Test');

    expect(container).toMatchSnapshot();
  });
});
