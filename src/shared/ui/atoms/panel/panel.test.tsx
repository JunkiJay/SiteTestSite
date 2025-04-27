import { render, screen } from '@testing-library/react';
import { Panel } from './panel';

describe('Panel', () => {
  it('Match Snapshot', () => {
    const { container } = render(<Panel>Test</Panel>);

    expect(screen.getByText('Test')).toHaveTextContent('Test');

    expect(container).toMatchSnapshot();
  });

  it('Rendered', () => {
    render(<Panel>Test</Panel>);

    const element = screen.getByText('Test');

    expect(element).toBeInTheDocument();
  });
});
