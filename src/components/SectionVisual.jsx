import { asset } from '../utils/asset'

export function SectionVisual({ alt, src }) {
  return (
    <figure className="section-visual">
      <img src={asset(src)} alt={alt} loading="lazy" decoding="async" />
    </figure>
  )
}
