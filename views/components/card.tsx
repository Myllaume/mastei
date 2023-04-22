import styles from './card.module.css';
import { DateDisplay } from './datedisplay';
import { MoreOptions } from './moreoptions';

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
        <span className={styles.key}>Dernière édition</span>
        <span className={styles.value}>
          <DateDisplay timestamp={timestamp} />
        </span>
      </div>

      <MoreOptions
        actions={[
          {
            id: 'toto',
            label: 'toto',
            onClick: () => console.log('coucou'),
          },
          {
            id: 'tata',
            label: 'toto',
            onClick: () => console.log('coucou8'),
          },
        ]}
        className={styles.moreOptions}
      />
    </article>
  );
}

export { Card };
