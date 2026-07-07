import { useEffect, useState } from 'react'
import SectionLabel from '../components/SectionLabel'
import CinematicCard from '../components/CinematicCard'
import HorizontalGallery from '../components/HorizontalGallery'
import { supabase, supabaseEnabled } from '../lib/supabase'
import { fallbackProjects } from '../lib/projectsData'

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects)
  const [loading, setLoading] = useState(supabaseEnabled)

  useEffect(() => {
    if (!supabaseEnabled) return
    ;(async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order_index', { ascending: true })
        if (error) throw error
        if (data && data.length > 0) setProjects(data)
      } catch (err) {
        console.warn('Falling back to static project data:', err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <section id="projects" className="relative py-28 md:py-40 px-6 md:px-10 max-w-6xl mx-auto">
      <SectionLabel index={3} total={6} title="Selected Work" />
      <div className="flex items-end justify-between mb-12 gap-6">
        <h3 className="font-display text-3xl md:text-5xl tracking-tight max-w-xl leading-tight">
          Projects across product, commerce, and interaction design.
        </h3>
        <p className="hidden md:block font-mono text-[10px] tracking-widest uppercase shrink-0" style={{ color: 'var(--muted)' }}>
          Drag to explore →
        </p>
      </div>
      {loading ? (
        <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>LOADING PROJECTS…</p>
      ) : (
        <HorizontalGallery>
          {projects.map((p, i) => (
            <CinematicCard key={p.id} project={p} index={i} />
          ))}
        </HorizontalGallery>
      )}
    </section>
  )
}
