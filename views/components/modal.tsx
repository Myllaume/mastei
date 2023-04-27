import CloseRounded from '@mui/icons-material/CloseRounded';
import styles from './modal.module.css';
import { Overlay } from './overlay';

interface ModalProps {
  isOpen?: boolean;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
}

export function Modal({ isOpen = true, children, header, footer, onClose }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <Overlay onClick={onClose} />

      <section className={styles.modal}>
        <header className={styles.header}>
          <div>{header}</div>
          <CloseRounded className={styles.close} onClick={onClose} />
        </header>
        <main className={styles.content}>{children}</main>
        <footer className={styles.footer}>{footer}</footer>
      </section>
    </div>
  );
}
