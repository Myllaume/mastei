import { render } from '@testing-library/react';
import { AppName } from './appname';

jest.mock('./appname.module.css', () => ({
  __esModule: true,
  default: () => ({}),
}));

const mockUseQuery = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  __esModule: true,
  useQuery: (p) => mockUseQuery(p),
}));

const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
);
global.fetch = mockFetch as any;

describe('AppName', () => {
  it('should render app name without version', () => {
    mockUseQuery.mockImplementation(() => ({ data: null }));

    const { queryByText } = render(<AppName />);

    expect(queryByText('Masteï')).toBeTruthy();
    expect(queryByText(/version/)).toBeNull();
  });

  it('should render app name with version', () => {
    mockUseQuery.mockImplementation(() => ({ data: { version: '1.0.0' } }));

    const { queryByText, container } = render(<AppName />);

    expect(queryByText('Masteï')).toBeTruthy();
    expect(queryByText(/version 1.0.0/)).toBeTruthy();
  });

  it('should fetch app informations when mounting', () => {
    mockUseQuery.mockImplementation(({ queryFn }) => {
      queryFn();
      return { data: { version: '1.0.0' } };
    });

    render(<AppName />);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('/appInformations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
