import { useState } from 'react';
import { useUser } from './userStore';
import api from '../services/api';

export function useCategory() {
  const [errorCategory, setErrorCategory] = useState('');
  const [categoryInEditing, setCategoryInEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [dataCategory, setDataCategory] = useState([]);

  // TODO @criar a função de listar aqui

  async function handleRegisterCategory(category, token) {
    const body = {
      name: category,
    };

    try {
      const response = await api.post('/categories', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (error) {
      const currentError = error.response.data.message || error.response.data;
      setErrorCategory(currentError);
      return error.response;
    }
  }

  async function handleDeleteCategory(id, token) {
    try {
      const response = await api.delete(`/categories/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      const currentError = error.response.data.message || error.response.data;
      setErrorCategory(currentError);
      return error.response;
    }
  }

  async function handleEditCategory(category, token) {
    const body = {
      name: category,
    };

    try {
      const response = await api.patch(`/categories/${categoryInEditing.id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      const currentError = error.response.data.message || error.response.data;
      setErrorCategory(currentError);
      return error.response;
    }
  }

  return {
    handleRegisterCategory,
    handleDeleteCategory,
    errorCategory,
    setErrorCategory,
    categoryInEditing,
    setCategoryInEditing,
    handleEditCategory,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPage,
    dataCategory,
    setDataCategory,
  };
}
