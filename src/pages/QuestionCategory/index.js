import SearchCategory from 'components/SearchCategory';
import { useState, useEffect } from 'react';
import { useStores } from 'stores';
import { useEffect, useState } from 'react';
import Paginator from 'components/Paginator';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.scss';
import topicIcon from '../../assets/topic-icon.svg';
import editIcon from '../../assets/edit-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';
import api from '../../services/api';

export function QuestionCategory() {
  const [dataCategory, setDataCategory] = useState([]);
  const navigate = useNavigate();
  const [serchItem, setSearchItem] = useState('');

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzMTNmNTdhLTJiMzQtNDU0Yi04ZTJlLTEyOGQ2NDllNGJkOSIsImVtYWlsIjoibWFudUBlbWFpbC5jb20iLCJ1c2VyVHlwZSI6InN1cGVyIGFkbWluIiwiaWF0IjoxNjQ5NzkyOTkzLCJleHAiOjE2NDk4NzkzOTN9.vaAeQmJW0MvrqlOs47l6rqogh-jraZUR9qior1pS15E';

  const {
    modalStore: {
      openModalDeleteCategory,
      setOpenModalDeleteCategory,
      openModalNewCategory,
      setOpenModalNewCategory,
    },
    categoryStore: {
      setCategoryInEditing,
      currentPage,
      totalPages,
      setTotalPage,
    },

  } = useStores();
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkNmVlNjMzLTU5OWItNDY5MC04ZWU5LWRkNjJkNGQyY2FmNiIsImVtYWlsIjoibWFudUBlbWFpbC5jb20iLCJ1c2VyVHlwZSI6InN1cGVyIGFkbWluIiwiaWF0IjoxNjQ5ODU2MTI3LCJleHAiOjE2NDk5NDI1Mjd9.LXKQ7eJNaHpx1QMnqKV_Hi1zQcNFAfAv6nKsZnH1SGw';
  function handleOpenEdit(item) {
    setCategoryInEditing(item);
    setOpenModalNewCategory(true);
  }

  const pages = [];

  for (let page = 1; page <= totalPages; page += 1) {
    pages.push(page);
  }

  useEffect(() => {
    handleListCategory();
  }, [currentPage, openModalDeleteCategory, openModalNewCategory]);

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
    } catch (error) {
      return error;
    }
  }

  return (
    <main>
      <SearchCategory setSearchTerm={setSearchItem} />
      <div className={style['table']}>
        <div className={style['table-header']}>
          <div className={style['name-title']}><span>Nome</span></div>
          <div className={style['category-title']}><span>Quantidade</span></div>
          <div className={style['manage-title']}><span>Gerenciar</span></div>
        </div>
        <div className={style['table-body']}>
          {dataCategory.filter((item) => item.name.toLocaleLowerCase()
            .includes(serchItem.toLocaleLowerCase()))
            .map((item) => (
              <div className={style['table-line']} key={item.id}>
                <div className={style['first-line-item']} onClick={() => navigate('/main/list-question')}>
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
      <Paginator />
    </main>
  );
}
