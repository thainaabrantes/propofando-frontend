import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import api from '../services/api';

export function useSimulated() {
  const [errorListUserSimulated, setErrorListUserSimulated] = useState('');
  const [errorCreateUserSimulated, setErrorCreateUserSimulated] = useState('');
  const [listUserSimulated, setListUserSimulated] = useState([]);
  const [performance, setPerformance] = useState({});
  const [top3AnsweredCorrectly, setTop3AnsweredCorrectly] = useState([]);
  const [top3AnsweredIncorrectly, setTop3AnsweredIncorrectly] = useState([]);
  const [idSimulated, setIdSimulated] = useState({});
  const [consultingSimulated, setConsultingSimulated] = useLocalStorage('consulting-simulated');
  const [page, setPage] = useState(0);
  const [questionsSimulated, setQuestionsSimulated] = useState([]);

  async function handleListUserSimulated(userId, token) {
    try {
      const response = await api.get(`/simulated/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      return data;
    } catch (error) {
      const currentError = error.response.data.message || error.response.data;
      setErrorListUserSimulated(currentError);
      return error.response;
    }
  }

  async function handleCreateUserSimulated(form, userId, categories, token) {
    const body = {
      name: form.name,
      userId,
      quantityQuestions: Number(form.quantity),
      categories,
    };

    try {
      const response = await api.post('/simulated', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      setConsultingSimulated(data);
      return response;
    } catch (error) {
      const currentError = error.response.data.message || error.response.data;
      setErrorCreateUserSimulated(currentError);
      return error.response;
    }
  }

  async function handlePerformance(userId, token) {
    try {
      const response = await api.get(`/users/${userId}/performance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      setPerformance({ ...data });
      return data;
    } catch (error) {
      return error.response;
    }
  }

  async function handleConsultAnswers(simulatedId, token) {
    try {
      const response = await api.get(`/simulated/${simulatedId}/answers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      return data;
    } catch (error) {
      const currentError = error.response.data.message || error.response.data;
      setErrorListUserSimulated(currentError);
    }
  }

  async function handleTop3CategoriesHits(userId, token) {
    try {
      const response = await api.get(`/users/${userId}/top-3-hits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      setTop3AnsweredCorrectly([...data]);
      return data;
    } catch (error) {
      return error.response;
    }
  }

  async function handleTop3CategoriesErrors(userId, token) {
    try {
      const response = await api.get(`/users/${userId}/top-3-errors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      setTop3AnsweredIncorrectly([...data]);
      return data;
    } catch (error) {
      return error.response;
    }
  }

  return {
    handleListUserSimulated,
    handleCreateUserSimulated,
    handleConsultAnswers,
    errorListUserSimulated,
    setErrorListUserSimulated,
    listUserSimulated,
    setListUserSimulated,
    setErrorCreateUserSimulated,
    errorCreateUserSimulated,
    handlePerformance,
    performance,
    setPerformance,
    handleTop3CategoriesHits,
    top3AnsweredCorrectly,
    setTop3AnsweredCorrectly,
    handleTop3CategoriesErrors,
    top3AnsweredIncorrectly,
    setTop3AnsweredIncorrectly,
    consultingSimulated,
    setConsultingSimulated,
    page,
    setPage,
    questionsSimulated,
    setQuestionsSimulated,
  };
}
