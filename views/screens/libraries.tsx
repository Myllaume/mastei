import { useQuery } from '@tanstack/react-query';
import { library, menuItem } from '../../types';
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

  const menuTemplate: menuItem[] = [
    {
      id: 'create',
      label: 'Créer',
      disable: false,

      sub: [
        {
          id: 'create-library',
          label: 'Nouvelle bibliothèque',
          disable: false,
          onClick: () => setShowModalAddLibrary(true),
        },
      ],
    },
    {
      id: 'help',
      label: 'Aide',
      disable: false,
      onClick: () => {
        console.log('Aide');
      },
    },
  ];

  return (
    <>
      <ToolBar template={menuTemplate} />
      <h1>Bibliothèques</h1>

      {librariesList.map(({ lastEditDate, title, id, canOpen }) => (
        <Card
          key={id}
          disabled={canOpen === false}
          title={title}
          nbFragments={3}
          timestamp={lastEditDate}
        />
      ))}

      {showModalAddLibrary && <ModalAddLibrary onClose={() => setShowModalAddLibrary(false)} />}
    </>
  );
}
