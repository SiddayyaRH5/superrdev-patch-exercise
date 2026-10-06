import { useEffect, useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import StatusFilter from './components/StatusFilter';
import TaskTable from './components/TaskTable';
import { useTasks } from './hooks/useTasks';

const PAGE_SIZE = 10;

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const { tasks, total, loading, error } = useTasks(query, status, page, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const hasFilters = Boolean(query.trim() || status);
  const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, total);

  const resultLabel = useMemo(() => {
    if (loading && total === 0) return 'Loading tasks…';
    if (total === 0) return hasFilters ? 'No matching tasks' : 'No tasks';
    return `Showing ${rangeStart}–${rangeEnd} of ${total} tasks`;
  }, [hasFilters, loading, rangeEnd, rangeStart, total]);

  const updateQuery = (value) => {
    setQuery(value);
    setPage(1);
  };

  const updateStatus = (value) => {
    setStatus(value);
    setPage(1);
  };

  const clearFilters = () => {
    setQuery('');
    setStatus('');
    setPage(1);
  };

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <span className="eyebrow">INTERNAL WORKSPACE</span>
          <h1>Task Tracker</h1>
          <p className="subtitle">Search, filter and monitor your team&apos;s development tasks.</p>
        </div>
        <div className="header-count" aria-label={`${total} matching tasks`}>
          <strong>{total}</strong>
          <span>tasks</span>
        </div>
      </header>

      <section className="filter-panel" aria-label="Task filters">
        <div className="search-wrap">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <SearchBar value={query} onChange={updateQuery} />
        </div>
        <StatusFilter value={status} onChange={updateStatus} />
        {hasFilters && (
          <button className="clear-button" type="button" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </section>

      <div className="results-meta">
        <span>{resultLabel}</span>
        {hasFilters && <span className="active-filter">Filtered results</span>}
      </div>

      <TaskTable tasks={tasks} loading={loading} error={error} hasFilters={hasFilters} onClear={clearFilters} />

      {totalPages > 1 && !loading && !error && (
        <nav className="pagination" aria-label="Task pagination">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            ← Previous
          </button>
          <span className="page-indicator">
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => current + 1)}
          >
            Next →
          </button>
        </nav>
      )}
    </main>
  );
}
