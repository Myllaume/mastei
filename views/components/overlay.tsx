import styles from './overlay.module.css';

interface OverlayProps {
  onClick?: () => void;
}

export function Overlay({ onClick }: OverlayProps) {
  return <div className={styles.overlay} onClick={onClick} />;
}
