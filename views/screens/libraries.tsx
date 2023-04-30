import { useQuery } from '@tanstack/react-query';
import { library, menuItem } from '../../types';
import { Card } from '../components/card';
import { ToolBar } from '../components/toolbar';
import { ModalAddLibrary } from '../components/modalAddLibrary';
import { useState } from 'react';
import styles from './libraries.module.css';
import { useToggle } from 'react-use';

export function Libraries() {
  const [showModalAddLibrary, setShowModalAddLibrary] = useState<boolean>(false);
  const [showHelpPanel, toggleHelpPanel] = useToggle(false);

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
      onClick: () => toggleHelpPanel(),
    },
  ];

  return (
    <div className="screen">
      <ToolBar template={menuTemplate} />

      <div className="body">
        <section className="main-content">
          <h1>Bibliothèques</h1>

          <section className={styles.grid}>
            {librariesList.map(({ lastEditDate, title, id, canOpen }) => (
              <Card
                key={id}
                className={styles.card}
                disabled={canOpen === false}
                title={title}
                nbFragments={3}
                timestamp={lastEditDate}
              />
            ))}
          </section>

          {showModalAddLibrary && <ModalAddLibrary onClose={() => setShowModalAddLibrary(false)} />}
        </section>

        <aside className="secondary-content">
          {showHelpPanel && (
            <div className="panel">
              <h2>Aide</h2>

              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam, cupiditate?</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
