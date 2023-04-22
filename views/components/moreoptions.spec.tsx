import { render, fireEvent } from '@testing-library/react';
import { MoreOptions } from './moreoptions';

jest.mock('./moreoptions.module.css', () => ({
  __esModule: true,
  default: () => ({}),
}));

jest.mock('@mui/icons-material/MoreVert', () => ({
  __esModule: true,
  default: ({ onClick }) => <div onClick={onClick} data-testid="MoreVert" />,
}));

describe('MoreOptions', () => {
  const actions = [
    { id: '1', label: 'Option 1', onClick: jest.fn() },
    { id: '2', label: 'Option 2', onClick: jest.fn() },
    { id: '3', label: 'Option 3', onClick: jest.fn() },
  ];

  it('should render component', () => {
    const { queryByTestId } = render(<MoreOptions actions={actions} />);
    expect(queryByTestId('box')).toBeTruthy();
  });

  it('unfold when prop is true', () => {
    const { queryByTestId } = render(<MoreOptions actions={actions} unfolded />);
    expect(queryByTestId('cover')).toBeTruthy();
  });

  it('toggle fold when icon is clicked', () => {
    const { getByTestId, queryByTestId } = render(<MoreOptions actions={actions} />);
    expect(queryByTestId('cover')).toBeFalsy();

    fireEvent.click(getByTestId('MoreVert'));
    expect(queryByTestId('cover')).toBeTruthy();

    fireEvent.click(getByTestId('MoreVert'));
    expect(queryByTestId('cover')).toBeFalsy();
  });

  it('display actions when it unfolded', () => {
    const { getAllByTestId, queryByTestId } = render(<MoreOptions actions={actions} unfolded />);
    expect(queryByTestId('cover')).toBeTruthy();
    expect(getAllByTestId('list-elt')).toHaveLength(actions.length);
  });

  it('calls the onClick function when an option is clicked', () => {
    const { getAllByTestId, getByTestId } = render(<MoreOptions actions={actions} />);
    fireEvent.click(getByTestId('MoreVert'));
    fireEvent.click(getAllByTestId('list-elt')[0]);
    expect(actions[0].onClick).toHaveBeenCalled();
  });
});
