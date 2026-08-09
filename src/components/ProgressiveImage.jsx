import { useEffect, useRef, useState } from 'react'

export function ProgressiveImage({ alt, className = '', shellClassName = '', onLoad, ...props }) {
  const imageRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current.naturalWidth) setLoaded(true)
  }, [])

  const handleLoad = (event) => {
    setLoaded(true)
    onLoad?.(event)
  }

  return (
    <span className={`progressive-image ${shellClassName} ${loaded ? 'is-loaded' : ''}`}>
      <span className="image-skeleton" aria-hidden="true" />
      <img ref={imageRef} className={className} alt={alt} onLoad={handleLoad} {...props} />
    </span>
  )
}
