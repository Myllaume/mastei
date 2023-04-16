import { useEffect, useState } from 'react';
import styles from './appname.module.css';

function AppName() {
  const [name, setName] = useState();
  const [version, setVersion] = useState();

  useEffect(() => {
    fetch('/api').then(async (response) => {
      const { app } = await response.json();
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
