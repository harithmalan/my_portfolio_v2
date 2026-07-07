import ParallaxPanel from './ParallaxPanel'

export default function CinematicCard({ project, index }) {
  return (
    <div className="relative shrink-0 w-[78vw] sm:w-[420px] md:w-[480px] h-[520px] md:h-[560px] group" data-cursor-hover>
      <ParallaxPanel className="w-full h-full" image={project.image}>
        <div className="h-full flex flex-col justify-between p-7 md:p-8">
          <div className="flex items-start justify-between">
            <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            {project.featured && (
              <span
                className="font-mono text-[9px] tracking-widest px-2 py-1 rounded-full border backdrop-blur-sm"
                style={{ color: 'var(--accent)', borderColor: 'rgba(201,164,106,0.4)' }}
              >
                FEATURED
              </span>
            )}
          </div>

          <div>
            {project.tagline && (
              <p className="font-mono text-xs mb-2 tracking-wide" style={{ color: 'var(--accent)' }}>{project.tagline}</p>
            )}
            <h3 className="font-display text-3xl md:text-4xl mb-3 leading-tight">{project.title}</h3>
            <p
              className="text-sm leading-relaxed mb-5 max-w-sm opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 overflow-hidden"
              style={{ color: 'var(--muted)' }}
            >
              {project.description}
            </p>
            {project.tech?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-1 rounded-full border backdrop-blur-sm"
                    style={{ borderColor: 'rgba(243,239,232,0.2)', color: 'var(--text)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-5 font-mono text-xs">
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="hover:opacity-70" style={{ color: 'var(--accent)' }}>
                  LIVE ↗
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer" className="hover:opacity-70" style={{ color: 'var(--text)' }}>
                  CODE ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </ParallaxPanel>
    </div>
  )
}
