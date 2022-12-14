import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import api from '../services/api';
import { useSimulated } from './simulatedStore';
import { useUser } from './userStore';

export function useQuestion() {
  const [errorQuestion, setErrorQuestion] = useState('');
  const [listQuestions, setListQuestions] = useState([]);
  const [categoryQuestions, setCategoryQuestions] = useLocalStorage('listQuestionsOfCategory');
  const [questionInEditing, setQuestionInEditing] = useLocalStorage('questionInEditing');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState('');
  const [statistic, setStatistic] = useState({});

  const {
    questionsSimulated: randomQuestions,
    setQuestionsSimulated: setRandomQuestions,
  } = useSimulated();

  async function handleListQuestions(token) {
    try {
      const response = await api.get(`/questions?page=${currentPage}&&category=${categoryQuestions.id}`, {
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

  async function handleDeleteQuestion(id, token) {
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

  async function handleRegisterQuestion({ form, alternatives, categoryId }, token) {
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

  async function handleEditQuestion({ form, alternatives, categoryId }, token) {
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

  async function handleAnswereSimulated(id, altenativeId, token) {
    const body = {
      id,
      altenativeId,
    };
    try {
      const response = await api.patch('/simulated', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async function handleListRandomQuestions(simulatedId, userId, token) {
    try {
      const response = await api.get(`/simulated/${simulatedId}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      setRandomQuestions([...data]);
      return data;
    } catch (error) {
      return error;
    }
  }

  async function handleQuestionStatistic(questionId, token) {
    try {
      const response = await api.get(`/questions/${questionId}/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;

      return data;
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
    categoryQuestions,
    setCategoryQuestions,
    questionInEditing,
    setQuestionInEditing,
    currentPage,
    setCurrentPage,
    totalPages,
    categoryName,
    setCategoryName,
    handleAnswereSimulated,
    randomQuestions,
    setRandomQuestions,
    handleListRandomQuestions,
    handleQuestionStatistic,
    statistic,
    setStatistic,
  };
}
