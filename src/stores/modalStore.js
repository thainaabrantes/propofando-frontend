import { useState } from 'react';

export function useModal() {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalRegisterUser, setOpenModalRegisterUser] = useState(false);
  const [openModalNewCategory, setOpenModalNewCategory] = useState(false);

  return (
    {
      openModalEdit,
      setOpenModalEdit,
      openModalDelete,
      setOpenModalDelete,
      openModalRegisterUser,
      setOpenModalRegisterUser,
      openModalNewCategory,
      setOpenModalNewCategory,
    }
  );
}
