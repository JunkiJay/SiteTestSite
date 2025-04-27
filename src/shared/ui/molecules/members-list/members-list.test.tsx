import { render, screen } from '@testing-library/react';
import { MembersList } from '.';
import { Member } from '@entities/company/types';

describe('', () => {
  const members: Member[] = [
    { id: '1', image: '', login: 'Login 1' },
    { id: '2', image: '', login: 'Login 2' },
    { id: '3', image: '', login: 'Login 3' },
  ];

  it('should rendered', () => {
    render(<MembersList members={members} title="Members list" />);
    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<MembersList members={members} title="Members list" />);

    expect(container).toMatchSnapshot();
  });
});
