export function SectionHeading({ eyebrow, title, description, titleId }) {
  return (
    <header className="section-heading">
      <span>{eyebrow}</span>
      <h2 id={titleId}>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  )
}
