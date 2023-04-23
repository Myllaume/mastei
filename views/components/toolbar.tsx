import styles from './toolbar.module.css';
import { AppName } from './appname';

export function ToolBar() {
  return (
    <section className={styles.box}>
      <AppName />
    </section>
  );
}
