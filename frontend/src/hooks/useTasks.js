import { useEffect, useState } from 'react';
import { fetchTasks } from '../api';

export function useTasks(query, status, page, pageSize) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError(null);

    fetchTasks({ query, status, page, pageSize, signal: controller.signal })
      .then((data) => {
        if (!active) return;
        setTasks(data.items ?? []);
        setTotal(data.total ?? 0);
      })
      .catch((err) => {
        if (!active || err.name === 'AbortError') return;
        setError(err.message || 'Unable to load tasks.');
        setTasks([]);
        setTotal(0);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [query, status, page, pageSize]);

  return { tasks, total, loading, error };
}
