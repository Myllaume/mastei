import { render, fireEvent } from '@testing-library/react';
import { Overlay } from './overlay';

jest.mock('./overlay.module.css', () => ({
  __esModule: true,
  default: () => ({}),
}));

describe('Overlay', () => {
  it('should render', () => {
    const { container } = render(<Overlay />);

    expect(container.firstChild).not.toBeNull();
  });

  it('should call onClick callback when clicked', () => {
    const mockOnClick = jest.fn();
    const { container } = render(<Overlay onClick={mockOnClick} />);

    fireEvent.click(container.firstChild as HTMLDivElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
