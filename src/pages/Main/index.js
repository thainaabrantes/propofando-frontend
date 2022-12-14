import AdminPanel from 'components/AdminPanel';
import Header from 'components/Header';
import ModalEdit from 'components/ModalEdit';
import { useStores } from 'stores';
import { Outlet } from 'react-router-dom';
import ModalDeleteUser from 'components/ModalDeleteUser';
import ModalRegisterUser from 'components/ModalRegisterUser';
import ModalNewCategory from 'components/ModalNewCategory';
import ModalDeleteCategory from 'components/ModalDeleteCategory';
import ModalDeleteQuestion from 'components/ModalDeleteQuestion';
import style from './styles.module.scss';

export function Main() {
  const {
    modalStore: {
      openModalEdit,
      openModalDelete,
      openModalRegisterUser,
      openModalNewCategory,
      openModalDeleteCategory,
      openModalDeleteQuestion,
    },
  } = useStores();
  return (
    <div className={style['container-main']}>
      <Header />
      <div className={style['div-wrapper']}>
        <AdminPanel />
        <div className={style['div-center']}>
          <Outlet />
        </div>
      </div>
      {openModalEdit && <ModalEdit />}
      {openModalDelete && <ModalDeleteUser />}
      {openModalRegisterUser && <ModalRegisterUser />}
      {openModalNewCategory && <ModalNewCategory />}
      {openModalDeleteCategory && <ModalDeleteCategory />}
      {openModalDeleteQuestion && <ModalDeleteQuestion />}
    </div>
  );
}
