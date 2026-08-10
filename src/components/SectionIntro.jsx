import { SectionHeading } from './SectionHeading'
import { SectionVisual } from './SectionVisual'

export function SectionIntro({ alt, description, eyebrow, src, title, titleId }) {
  return (
    <div className="section-intro">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        titleId={titleId}
      />
      <SectionVisual src={src} alt={alt} />
    </div>
  )
}
