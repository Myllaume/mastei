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
      id: 'new-librairy',
      label: 'Créer',
      disable: false,
      onClick: () => {
        console.log('Créer');
      },

      sub: [
        {
          id: 'toto',
          label: 'toto',
          disable: false,
          onClick: () => {
            console.log('toto');
          },

          sub: [
            {
              id: 'tata',
              label: 'tata',
              disable: false,
              onClick: () => {
                console.log('tata');
              },
            },
          ],
        },
        {
          id: 'tjtj',
          label: 'tjtj',
          disable: false,
          onClick: () => {
            console.log('tjtj');
          },
        },
        {
          id: 'tutu',
          label: 'tutu',
          disable: true,
          onClick: () => {
            console.log('tutu');
          },

          sub: [
            {
              id: 'tyty',
              label: 'tyty',
              disable: true,
              onClick: () => {
                console.log('tyty');
              },
            },
            {
              id: 'tete',
              label: 'tete',
              disable: false,
              onClick: () => {
                console.log('tete');
              },
            },
          ],
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

      <button onClick={() => setShowModalAddLibrary(true)}>Ajouter une bibliothèque</button>
    </>
  );
}
