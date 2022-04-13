import { createContext, useContext } from 'react';
import { useCounter } from './counterStore';
import { useModal } from './modalStore';
import { useUser } from './userStore';
import { useUtils } from './utilsStore';
import { useStudentAdmin } from './studentAdminStore';

const storesCtx = createContext(null);

export function useStores() {
  return useContext(storesCtx);
}

export function StoresProvider({ children }) {
  const userStore = useUser();
  const counterStore = useCounter();
  const modalStore = useModal();
  const utilsStore = useUtils();

  const stundetAdminStore = useStudentAdmin();

  return (
    <storesCtx.Provider value={{
      userStore,
      counterStore,
      modalStore,
      utilsStore,
      stundetAdminStore,
    }}
    >
      {children}
    </storesCtx.Provider>
  );
}
