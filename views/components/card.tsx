import styles from './card.module.css';
import { DateDisplay } from './datedisplay';

interface CardProps {
  nbFragments: number;
  timestamp: number;
}

function Card({ nbFragments, timestamp }: CardProps) {
  return (
    <article className={styles.box}>
      <h3 className={styles.title}>Title</h3>

      <div className={styles.table}>
        <span className={styles.key}>Fragments</span>
        <span className={styles.value}>{nbFragments}</span>
        <span className={styles.key}>tree</span>
        <span className={styles.value}>
          <DateDisplay timestamp={timestamp} />
        </span>
      </div>
    </article>
  );
}

export { Card };
