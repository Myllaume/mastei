import styles from './appname.module.css';
import { AppInformations } from '../../types';
import { useQuery } from '@tanstack/react-query';

function AppName() {
  const { data } = useQuery<AppInformations>({
    queryKey: ['appConfig'],
    queryFn: () =>
      fetch('/appInformations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
  });

  return (
    <span>
      <span className={styles.appName}>Masteï</span>{' '}
      {data?.version && <span className={styles.version}>version {data.version}</span>}
    </span>
  );
}

export { AppName };
