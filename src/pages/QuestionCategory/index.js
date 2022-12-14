import SearchCategory from 'components/SearchCategory';
import { useState, useEffect } from 'react';
import { useStores } from 'stores';
import Paginator from 'components/Paginator';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.scss';
import topicIcon from '../../assets/topic-icon.svg';
import editIcon from '../../assets/edit-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';
import api from '../../services/api';

export function QuestionCategory() {
  const {
    modalStore: {
      openModalDeleteCategory,
      setOpenModalDeleteCategory,
      openModalNewCategory,
      setOpenModalNewCategory,
      openModalDeleteQuestion,
    },
    categoryStore: {
      setCategoryInEditing,
      currentPage,
      setTotalPage,
      setCurrentPage,
      totalPages,
      dataCategory,
      setDataCategory,
    },
    userStore: {
      token,
    },
    questionStore: {
      setCategoryQuestions,
    },
  } = useStores();

  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState('');

  function handleOpenEdit(item) {
    setCategoryInEditing(item);
    setOpenModalNewCategory(true);
  }

  function handleOpenQuestions(item) {
    setCategoryQuestions(item);
    navigate('/main/list-question');
  }

  useEffect(() => {
    handleListCategory();
  }, [currentPage, openModalDeleteCategory, openModalNewCategory, openModalDeleteQuestion]);

  async function handleListCategory() {
    try {
      const response = await api.get(`/categories/paginated?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;

      setDataCategory(data.categories);
      setTotalPage(data.totalPages);
      return;
    } catch (error) {
      return error;
    }
  }

  return (
    <main>
      <SearchCategory setSearchItem={setSearchItem} />
      <div className={style['table']}>
        <div className={style['table-header']}>
          <div className={style['name-title']}><span>Nome</span></div>
          <div className={style['category-title']}><span>Quantidade</span></div>
          <div className={style['manage-title']}><span>Gerenciar</span></div>
        </div>
        <div className={style['table-body']}>
          {dataCategory && dataCategory.filter((item) => item.name.toLocaleLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/gi, '')
            .includes(searchItem.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/gi, '')))
            .map((item) => (
              <div className={style['table-line']} key={item.id}>
                <div className={style['first-line-item']} onClick={() => handleOpenQuestions(item)}>
                  <img src={topicIcon} alt="Categoria" />
                  <span>{item.name}</span>
                </div>
                <div className={style['second-line-item']}>
                  <span>{item.totalQuestions}</span>
                </div>

                <div className={style['third-line-item']}>
                  <button
                    onClick={() => handleOpenEdit(item)}
                  >
                    <img src={editIcon} alt="editar" />
                  </button>
                  <button onClick={() => setOpenModalDeleteCategory(item.id)}><img src={deleteIcon} alt="deletar" /></button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Paginator
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </main>
  );
}
