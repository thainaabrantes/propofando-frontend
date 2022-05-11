import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import api from '../services/api';
import { useUser } from './userStore';

export function useQuestion() {
  const [errorQuestion, setErrorQuestion] = useState('');
  const [listQuestions, setListQuestions] = useState([]);
  const [idCategory, setIdCategory] = useState('');
  const [questionInEditing, setQuestionInEditing] = useLocalStorage('questionInEditing');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState('');

  async function handleListQuestions(token) {
    try {
      const response = await api.get(`/questions?page=${currentPage}&&category=${idCategory}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;

      setListQuestions(data.questions);
      setTotalPages(data.totalPages);
    } catch (error) {
      const currentError = error.response.data.message || error.response.data;
      setErrorQuestion(currentError);
      return error.response;
    }
  }

  const { token } = useUser();

  async function handleDeleteQuestion(id) {
    try {
      const response = await api.delete(`/questions/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      const currentError = error.response.data.message || error.response.data;
      setErrorQuestion(currentError);
      return error.response;
    }
  }

  async function handleRegisterQuestion({ form, alternatives, categoryId }) {
    const body = {
      title: form.title,
      description: form.description,
      categoryId,
      image: form.image,
      explanationVideo: form.explanationVideo,
      explanationText: form.explanationText,
      alternatives,
    };

    try {
      const response = await api.post('/questions', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      const currentError = error.response.data.message || error.response.data;
      setErrorQuestion(currentError);
      return error.response;
    }
  }

  async function handleEditQuestion({ form, alternatives, categoryId }) {
    const body = {
      title: form.title,
      description: form.description,
      categoryId,
      image: form.image,
      explanationVideo: form.explanationVideo,
      explanationText: form.explanationText,
      alternatives,
    };

    try {
      const response = await api.patch(`/questions/${questionInEditing.id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      const currentError = error.response.data.message || error.response.data;
      setErrorQuestion(currentError);
      return error.response;
    }
  }

  return {
    handleListQuestions,
    handleDeleteQuestion,
    handleRegisterQuestion,
    handleEditQuestion,
    errorQuestion,
    setErrorQuestion,
    listQuestions,
    setListQuestions,
    idCategory,
    setIdCategory,
    questionInEditing,
    setQuestionInEditing,
    currentPage,
    setCurrentPage,
    totalPages,
    categoryName,
    setCategoryName,
  };
}