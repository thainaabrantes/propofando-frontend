import { useStores } from 'stores';
import clear from '../../assets/clear-icon.svg';
import style from './styles.module.scss';

function ModalEdit() {
  const {
    modalStore: {
      openModalEdit,
      setOpenModalEdit,
    },
  } = useStores();

  return (
    <div className={style['background-modal']}>
      <div className={style.container}>
        <div className={style['btn-close']}>
          <button
            onClick={() => setOpenModalEdit(false)}
          >
            <img src={clear} alt="close" />
          </button>
        </div>
        <h2>Editar dados</h2>

        <form>
          <div className={style.wrapInputs}>
            <div className={style.containerInputs}>
              <label>Nome</label>
              <input className="input-light" placeholder="Nome" />
            </div>
            <div className={style.containerInputs}>
              <label>Email</label>
              <input className="input-light" placeholder="Email" />
            </div>
          </div>
          <div className={style.wrapInputBtn}>
            <div className={style.containerInputs}>
              <label>Senha</label>
              <input className="input-light" placeholder="Senha" type="password" />
            </div>
            <button className="button">Salvar alterações</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEdit;