import styles from './appname.module.css';
import { appInformations } from '../../types';
import { useQuery } from '@tanstack/react-query';

function AppName() {
  const { isLoading, data } = useQuery<appInformations>({
    queryKey: ['appConfig'],
    queryFn: () =>
      fetch('/appInformations/version', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);

        return res.json();
      }),
  });

  if (isLoading) return <span>Loading...</span>;

  return <span className={styles.toto}>Masteï version {data?.version}</span>;
}

export { AppName };
