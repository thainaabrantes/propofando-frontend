import { useState } from 'react';
import { useStores } from 'stores';
import clear from '../../assets/clear-icon.svg';
import style from './styles.module.scss';

const defaultValues = { name: '', email: '' };

function ModalRegisterUser() {
  const [form, setForm] = useState(defaultValues);
  const {
    modalStore: {
      openModalRegisterUser,
      setOpenModalRegisterUser,
    },
    userStore: {
      token,
    },
    studentAdminStore: {
      handleRegisterUser,
      errorUser,
      setErrorUser,
    },
    utilsStore: { setAlert },
  } = useStores();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorUser('');
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await handleRegisterUser(form, token);
    if (response.status > 201) {
      setAlert({ open: true, type: 'error', message: response.data.message });
      return;
    }
    setAlert({ open: true, type: 'success', message: response.data.message });
    setErrorUser('');
    setOpenModalRegisterUser(false);
  }

  return (
    <div className={style['background-modal']}>
      <div className={style.container}>
        <div className={style['btn-close']}>
          <button
            onClick={() => setOpenModalRegisterUser(false)}
          >
            <img src={clear} alt="close" />
          </button>
        </div>
        <h2>Cadastrar usuário</h2>

        <form onSubmit={handleSubmit}>
          <div className={style.wrapInputs}>
            <div className={style.containerInputs}>
              <label>Nome</label>
              <input
                className="input-light"
                placeholder="Nome"
                name="name"
                value={form.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={style.containerInputs}>
              <label>Email</label>
              <input
                className="input-light"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={(e) => handleChange(e)}
              />
              {errorUser && <span className={style['span-error']}>{errorUser}</span>}

            </div>
          </div>
          <div className={style.wrapInputBtn}>
            <button className="button">Adicionar cadastro</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalRegisterUser;
