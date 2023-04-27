import { render, fireEvent } from '@testing-library/react';
import { Modal } from './modal';

jest.mock('./modal.module.css', () => ({
  __esModule: true,
  default: () => ({}),
}));

jest.mock('@mui/icons-material/CloseRounded', () => ({
  __esModule: true,
  default: ({ onClick }) => <div onClick={onClick} data-testid="CloseRounded" />,
}));

jest.mock('./overlay', () => ({
  __esModule: true,
  Overlay: ({ onClick }) => <div onClick={onClick} data-testid="overlay" />,
}));

const mockOnClose = jest.fn();

describe('Modal', () => {
  it('should render with header, content and footer', () => {
    const header = <h1>Header</h1>;
    const content = <p>Content</p>;
    const footer = <p>Footer</p>;

    const { queryByText } = render(
      <Modal isOpen={true} onClose={mockOnClose} header={header} footer={footer}>
        {content}
      </Modal>
    );

    expect(queryByText('Header')).toBeTruthy();
    expect(queryByText('Content')).toBeTruthy();
    expect(queryByText('Footer')).toBeTruthy();
  });

  it('should render without header and footer', () => {
    const content = <p>Modal Content</p>;

    const { queryByTestId } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        {content}
      </Modal>
    );

    expect(queryByTestId('modal-header')).toBeNull();
    expect(queryByTestId('modal-footer')).toBeNull();
  });

  it('should not render if isOpen is false', () => {
    const { queryByTestId } = render(
      <Modal isOpen={false} onClose={mockOnClose}>
        Modal Content
      </Modal>
    );

    expect(queryByTestId('modal')).toBeNull();
  });

  it('should call onClose when clicking on overlay or close button', () => {
    mockOnClose.mockClear();

    const { getByTestId } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        Modal Content
      </Modal>
    );

    fireEvent.click(getByTestId('overlay'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    fireEvent.click(getByTestId('CloseRounded'));
    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });
});
