import { render, fireEvent } from '@testing-library/react';
import { ToolBar } from './toolbar';

jest.mock('./toolbar.module.css', () => ({
  __esModule: true,
  default: () => ({}),
}));

jest.mock('./appname', () => ({
  __esModule: true,
  AppName: () => <div data-testid="AppName" />,
}));

const mockMenuClick = jest.fn();
const mockSubMenuClick = jest.fn();
const mockSubSubMenuClick = jest.fn();

const template = [
  {
    id: 'menu-1',
    label: 'Menu 1',
    disable: false,
  },
  {
    id: 'menu-2',
    label: 'Menu 2',
    disable: false,
    onClick: mockMenuClick,
    sub: [
      {
        id: 'sub-menu-1',
        label: 'Sub Menu 1',
        disable: false,
        sub: [
          {
            id: 'sub-sub-menu-1',
            label: 'Sub sub Menu 1',
            disable: true,
            onClick: mockSubSubMenuClick,
          },
          {
            id: 'sub-sub-menu-2',
            label: 'Sub sub Menu 2',
            disable: false,
            sub: [
              {
                id: 'sub-sub-sub-menu-1',
                label: 'Sub sub sub Menu 1',
                disable: false,
              },
            ],
          },
        ],
      },
      {
        id: 'sub-menu-2',
        label: 'Sub Menu 2',
        disable: false,
        onClick: mockSubMenuClick,
      },
    ],
  },
];

describe('ToolBar', () => {
  it('should render with AppName', () => {
    const { queryByTestId } = render(<ToolBar template={template} />);
    expect(queryByTestId('AppName')).toBeTruthy();
  });

  it('should render all template labels on three levels', () => {
    const { queryByText } = render(<ToolBar template={template} />);

    expect(queryByText('Menu 1')).toBeTruthy();
    expect(queryByText('Menu 2')).toBeTruthy();
    expect(queryByText('Sub Menu 1')).toBeTruthy();
    expect(queryByText('Sub Menu 2')).toBeTruthy();
    expect(queryByText('Sub sub Menu 1')).toBeTruthy();
    expect(queryByText('Sub sub Menu 2')).toBeTruthy();

    expect(queryByText('Sub sub sub Menu 1')).toBeFalsy();
  });

  it('should call onClick if item is not disabled', () => {
    const { queryByText } = render(<ToolBar template={template} />);

    fireEvent.click(queryByText('Menu 2') as HTMLDivElement);
    expect(mockMenuClick).toHaveBeenCalled();

    fireEvent.click(queryByText('Sub Menu 2') as HTMLDivElement);
    expect(mockSubMenuClick).toHaveBeenCalled();

    fireEvent.click(queryByText('Sub sub Menu 1') as HTMLDivElement);
    expect(mockSubSubMenuClick).not.toHaveBeenCalled();
  });
});
