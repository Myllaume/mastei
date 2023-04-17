import { useEffect, useState } from 'react';
import styles from './appname.module.css';
import { appInformations, library } from '../../types';

function AppName() {
  const [name, setName] = useState<string>();
  const [version, setVersion] = useState<string>();

  useEffect(() => {
    fetch('/api/appconfig').then(async (response) => {
      const { app }: { app: appInformations } = await response.json();
      setName(app.name);
      setVersion(app.version);
    });
  }, []);

  useEffect(() => {
    fetch('/api/libraries').then(async (response) => {
      const libraries = await response.json() as library[];
      console.log(libraries);
    });
  }, []);

  return (
    <span className={styles.toto}>
      {name} version {version}
    </span>
  );
}

export { AppName };
