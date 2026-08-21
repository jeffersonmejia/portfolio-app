import { Icon } from './Icon'
import { TechnologyIcon } from './TechnologyIcon'

function SkillGroup({ group, technical, index }) {
  return (
    <article className="skill-group" style={{ '--skill-order': index }}>
      <header>
        {!technical && <span className="skill-soft-icon"><Icon name={group.icon} size={16} /></span>}
        <h3>{group.title}</h3>
      </header>
      <div className="skill-items">
        {technical
          ? group.skills.map((skill) => <TechnologyIcon key={skill} name={skill} />)
          : <p className="soft-skill-description">{group.description}</p>}
      </div>
    </article>
  )
}

export function SkillsPanel({ groups, technical = false }) {
  if (technical) {
    const columns = [groups.filter((_, index) => index % 2 === 0), groups.filter((_, index) => index % 2 === 1)]
    return (
      <div className="skills-grid is-technical">
        {columns.map((column, columnIndex) => (
          <div className="skills-column" key={columnIndex}>
            {column.map((group) => <SkillGroup group={group} technical index={groups.indexOf(group)} key={group.title} />)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="skills-grid is-soft">
      {groups.map((group, index) => <SkillGroup group={group} technical={false} index={index} key={group.title} />)}
    </div>
  )
}
