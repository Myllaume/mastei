import { useState } from 'react';
import { Modal } from './modal';
import { CustomError, formField, library } from '../../types';
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

  const {
    mutate: mutateAddLibrary,
    error,
    isLoading,
  } = useMutation<library, CustomError, { title: string }>({
    mutationKey: ['libraries-add'],
    mutationFn: (variables) =>
      fetch('/libraries/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variables),
      }).then(async (res) => {
        const result = await res.json();
        if (res.ok) {
          return result;
        } else {
          throw result;
        }
      }),
    onSuccess: () => {
      onClose();
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
          <button disabled={isLoading} onClick={onSubmit}>
            Ajouter
          </button>
          <button>Annuler</button>
        </>
      }
      onClose={onClose}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Titre
          <input name="title" value={formValue.title.value} onChange={onChange} />
        </label>

        {error && <output className={'error'}>{error.message}</output>}
      </form>
    </Modal>
  );
}
