import { Icon } from './Icon'

export function CategoryFilter({ label, items, selected, onSelect }) {
  return (
    <div className="filter-list" aria-label={label}>
      {items.map((item) => (
        <button
          className={selected === item.label ? 'is-active' : ''}
          key={item.label}
          type="button"
          aria-pressed={selected === item.label}
          onClick={() => onSelect(item.label)}
        >
          <Icon name={item.icon} size={16} />
          {item.label}
        </button>
      ))}
    </div>
  )
}
