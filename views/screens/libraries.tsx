import { useQuery, useMutation } from '@tanstack/react-query';
import { library } from '../../types';
import { Card } from '../components/card';
import { ToolBar } from '../components/toolbar';

export function Libraries() {
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

  const { mutate } = useMutation({
    mutationKey: ['libraries-add'],
    mutationFn: () =>
      fetch('/libraries/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'Toto' }),
      }).then((res) => {
        console.log(res);

        return res.json();
      }),
  });

  return (
    <>
      <ToolBar />
      <h1>Bibliothèques</h1>
      <Card nbFragments={3} timestamp={1} />
      <Card nbFragments={3} timestamp={1} />

      <button onClick={() => mutate()}>Ajouter une bibliothèque</button>
    </>
  );
}
