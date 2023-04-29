import { useQuery } from '@tanstack/react-query';
import { library } from '../../types';
import { Card } from '../components/card';
import { ToolBar } from '../components/toolbar';
import { ModalAddLibrary } from '../components/modalAddLibrary';
import { useState } from 'react';

export function Libraries() {
  const [showModalAddLibrary, setShowModalAddLibrary] = useState<boolean>(false);

  const {
    data: librariesList,
    isLoading,
    isError,
  } = useQuery<library[]>({
    queryKey: ['libraries'],
    queryFn: () =>
      fetch('/libraries', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
  });

  if (isLoading || isError) {
    return null;
  }

  return (
    <>
      <ToolBar />
      <h1>Bibliothèques</h1>

      {librariesList.map(({ lastEditDate, title, id }) => (
        <Card key={id} title={title} nbFragments={3} timestamp={lastEditDate} />
      ))}

      {showModalAddLibrary && <ModalAddLibrary onClose={() => setShowModalAddLibrary(false)} />}

      <button onClick={() => setShowModalAddLibrary(true)}>Ajouter une bibliothèque</button>
    </>
  );
}
