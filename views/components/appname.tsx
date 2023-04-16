import { useEffect, useState } from 'react';
import styles from './appname.module.css';
import { appInformations } from '../../types';

function AppName() {
  const [name, setName] = useState<string>();
  const [version, setVersion] = useState<string>();

  useEffect(() => {
    fetch('/api').then(async (response) => {
      const { app }: { app: appInformations } = await response.json();
      setName(app.name);
      setVersion(app.version);
    });
  }, []);

  return (
    <span className={styles.toto}>
      {name} version {version}
    </span>
  );
}

export { AppName };
