import style from './styles.module.scss';
import clear from '../../assets/clear-icon.svg';

function ModalDeleteCategory() {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style['btn-close']}>
          <button><img src={clear} alt="Close" /></button>
        </div>
        <div>
          <h2>
            Excluir categoria
          </h2>
          <p>
            Tem certeza que deseja excluir essa categoria? Essa ação não poderá ser desfeita.
          </p>
          <button className="button">Excluir</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteCategory;