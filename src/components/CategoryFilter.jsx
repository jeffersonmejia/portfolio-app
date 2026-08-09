export function CategoryFilter({ label, items, selected, onSelect }) {
  return (
    <div className="filter-list" aria-label={label}>
      {items.map((item) => (
        <button
          className={selected === item ? 'is-active' : ''}
          key={item}
          type="button"
          aria-pressed={selected === item}
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
