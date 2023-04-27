import { useQuery, useMutation } from '@tanstack/react-query';
import { library } from '../../types';
import { Card } from '../components/card';
import { ToolBar } from '../components/toolbar';
import { ModalAddLibrary } from '../components/modalAddLibrary';
import { useState } from 'react';

export function Libraries() {
  const [showModalAddLibrary, setShowModalAddLibrary] = useState<boolean>(false);

  const { data } = useQuery<library[]>({
    queryKey: ['libraries'],
    queryFn: () =>
      fetch('/libraries', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
  });

  return (
    <>
      <ToolBar />
      <h1>Bibliothèques</h1>
      <Card nbFragments={3} timestamp={1} />
      <Card nbFragments={3} timestamp={1} />

      {showModalAddLibrary && <ModalAddLibrary onClose={() => setShowModalAddLibrary(false)} />}

      <button onClick={() => setShowModalAddLibrary(true)}>Ajouter une bibliothèque</button>
    </>
  );
}
