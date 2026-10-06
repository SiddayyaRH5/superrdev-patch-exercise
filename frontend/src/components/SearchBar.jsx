export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      className="search-input"
      placeholder="Search by title or description..."
      aria-label="Search tasks"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
