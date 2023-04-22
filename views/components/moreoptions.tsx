import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useToggle, useClickAway } from 'react-use';
import cn from 'classnames';
import styles from './moreoptions.module.css';
import { useMemo, useRef } from 'react';

interface MoreOptionsProps {
  actions: {
    id: string;
    label: string;
    onClick: () => void;
  }[];
  unfolded?: boolean;
  className?: string;
  xAxis?: 'left' | 'right';
  yAxis?: 'top' | 'bottom';
}

function MoreOptions({
  actions,
  unfolded: unfoldedOnMount = false,
  className,
  xAxis = 'left',
  yAxis = 'bottom',
}: MoreOptionsProps) {
  const [unfolded, toggleUnfolded] = useToggle(unfoldedOnMount);

  const boxRef = useRef<HTMLDivElement>(null);

  const list = useMemo(
    () => (
      <ul className={styles.list}>
        {actions.map(({ id, label, onClick }) => (
          <li key={id} className={styles.listElt} onClick={onClick} data-testid="list-elt">
            {label}
          </li>
        ))}
      </ul>
    ),
    [actions]
  );

  useClickAway(boxRef, () => {
    toggleUnfolded(false);
  });

  return (
    <div className={cn(className)} ref={boxRef} data-testid="box">
      <div className={styles.box}>
        <MoreVertIcon onClick={toggleUnfolded} />

        {unfolded && (
          <div
            className={cn(styles.cover, {
              [styles.left]: xAxis === 'left',
              [styles.right]: xAxis === 'right',
              [styles.top]: yAxis === 'top',
              [styles.bottom]: yAxis === 'bottom',
            })}
            data-testid="cover"
          >
            {list}
          </div>
        )}
      </div>
    </div>
  );
}

export { MoreOptions };
