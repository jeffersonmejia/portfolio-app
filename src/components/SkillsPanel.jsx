import { Icon } from './Icon'
import { TechnologyIcon } from './TechnologyIcon'

export function SkillsPanel({ groups, technical = false }) {
  return (
    <div className={`skills-grid ${technical ? 'is-technical' : 'is-soft'}`}>
      {groups.map((group) => (
        <article className="skill-group" key={group.title}>
          <header>
            {!technical && <span className="skill-soft-icon"><Icon name={group.icon} size={16} /></span>}
            <h3>{group.title}</h3>
          </header>
          <div className="skill-items">
            {group.skills.map((skill) => technical
              ? <TechnologyIcon key={skill} name={skill} />
              : <span className="soft-skill" key={skill}>{skill}</span>)}
          </div>
        </article>
      ))}
    </div>
  )
}
