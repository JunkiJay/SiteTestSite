import { render, screen } from '@testing-library/react';
import { Progress } from './progress';

it('should renders without crashing', () => {
  render(<Progress data-testid="progress" />);

  const element = screen.getByTestId('progress');

  expect(element).toBeInTheDocument();
});

it('should match snapshot', () => {
  const { container } = render(<Progress data-testid="progress" />);

  expect(container).toMatchSnapshot();
});
