import styles from './card.module.css';
import { DateDisplay } from './datedisplay';
import { MoreOptions } from './moreoptions';
import cn from 'classnames';

interface CardProps {
  title: string;
  nbFragments: number;
  timestamp: number;
  disabled: boolean;
  className?: string;
}

function Card({ title, nbFragments, timestamp, disabled, className }: CardProps) {
  return (
    <article className={cn(styles.box, { [styles.disabled]: disabled }, className)}>
      <h3 className={styles.title}>{title}</h3>

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
