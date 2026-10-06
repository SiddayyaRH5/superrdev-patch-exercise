function formatStatus(status) {
  return status.replace('_', ' ');
}

export default function TaskTable({ tasks, loading, error, hasFilters, onClear }) {
  if (loading) {
    return (
      <div className="state-card" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <strong>Loading tasks</strong>
        <span>Fetching the latest task list…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-card state-error" role="alert">
        <div className="state-icon" aria-hidden="true">!</div>
        <strong>Unable to load tasks</strong>
        <span>{error}</span>
        <button type="button" onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="state-card">
        <div className="state-icon muted" aria-hidden="true">⌕</div>
        <strong>No tasks found</strong>
        <span>{hasFilters ? 'Try a different search or status filter.' : 'There are no active tasks to display.'}</span>
        {hasFilters && <button type="button" onClick={onClear}>Clear filters</button>}
      </div>
    );
  }

  return (
    <div className="table-shell">
      <div className="table-scroll">
        <table className="task-table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Task</th>
              <th scope="col">Status</th>
              <th scope="col">Priority</th>
              <th scope="col">Assignee</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="task-id">#{task.id}</td>
                <td>
                  <div className="task-title">{task.title}</div>
                  {task.description && <div className="task-desc">{task.description}</div>}
                </td>
                <td>
                  <span className={`status-badge ${task.status.toLowerCase()}`}>
                    <span className="status-dot" aria-hidden="true" />
                    {formatStatus(task.status)}
                  </span>
                </td>
                <td>
                  <span className={`priority priority-${task.priority?.toLowerCase()}`}>
                    {task.priority || '—'}
                  </span>
                </td>
                <td className="assignee-cell">
                  <span className="avatar" aria-hidden="true">
                    {(task.assignee || '?').charAt(0).toUpperCase()}
                  </span>
                  {task.assignee || 'Unassigned'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
