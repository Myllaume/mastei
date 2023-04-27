import { useEffect, useState } from 'react';
import { Modal } from './modal';
import { formField } from '../../types';
import { useMutation } from '@tanstack/react-query';

interface ModalAddLibraryProps {
  onClose: () => void;
}

interface Fields {
  title: formField;
}

export function ModalAddLibrary({ onClose }: ModalAddLibraryProps) {
  const [formValue, setFormValue] = useState<Fields>({
    title: {
      value: '',
      hasError: true,
    },
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  const { mutate: mutateAddLibrary } = useMutation({
    mutationKey: ['libraries-add'],
    mutationFn: (variables: { title: string }) =>
      fetch('/libraries/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variables),
      }).then((res) => res.json()),
    onMutate: () => {
      setDisabled(true);
    },
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      setDisabled(false);
    },
  });

  function valueHasError(name: string, value: string) {
    if (value.trim() === '') {
      return true;
    }
    return false;
  }

  function onChange(e) {
    const { value, name } = e.target;
    setFormValue((old) => ({
      ...old,
      [name]: {
        value,
        hasError: valueHasError(name, value),
      },
    }));
  }

  function onSubmit() {
    if (Object.values(formValue).some(({ hasError }) => hasError === true)) {
      return;
    }

    mutateAddLibrary({ title: formValue.title.value });
  }

  return (
    <Modal
      header={<h3>Ajouter une bibliothèque</h3>}
      footer={
        <>
          <button disabled={disabled} onClick={onSubmit}>
            Ajouter
          </button>
          <button>Annuler</button>
        </>
      }
      onClose={onClose}
    >
      <form>
        <label>
          Titre
          <input name="title" value={formValue.title.value} onChange={onChange} />
        </label>
      </form>
    </Modal>
  );
}
