import { useEffect, useState } from 'react';

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
    <>
      {name} version {version}
    </>
  );
}

export { AppName };
