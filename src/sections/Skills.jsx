import { useState, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Code2, Server, Palette, Database, GitBranch, Smartphone, Users, Clock, Brain, MessageSquare } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import SkillCard from '../components/SkillCard'
import DecorativeCore from '../components/three/DecorativeCore'
import FloatingArt from '../components/FloatingArt'

const CATEGORIES = ['All', 'Development', 'Design', 'Soft Skills']

const SKILLS = [
  { name: 'React', icon: Code2, level: 5, category: 'Development' },
  { name: 'Angular', icon: Code2, level: 4, category: 'Development' },
  { name: 'Node.js', icon: Server, level: 4, category: 'Development' },
  { name: 'Spring Boot', icon: Server, level: 3, category: 'Development' },
  { name: 'Flutter', icon: Smartphone, level: 3, category: 'Development' },
  { name: 'PHP', icon: Code2, level: 4, category: 'Development' },
  { name: 'Supabase / PostgreSQL', icon: Database, level: 4, category: 'Development' },
  { name: 'Java', icon: Code2, level: 3, category: 'Development' },
  { name: 'Git', icon: GitBranch, level: 4, category: 'Development' },
  { name: 'UI / UX Design', icon: Palette, level: 4, category: 'Design' },
  { name: 'Adobe Creative Suite', icon: Palette, level: 4, category: 'Design' },
  { name: 'Leadership', icon: Users, level: 4, category: 'Soft Skills' },
  { name: 'Time Management', icon: Clock, level: 4, category: 'Soft Skills' },
  { name: 'Critical Thinking', icon: Brain, level: 4, category: 'Soft Skills' },
  { name: 'Communication', icon: MessageSquare, level: 4, category: 'Soft Skills' },
]

export default function Skills() {
  const [active, setActive] = useState('All')
  const filtered = useMemo(
    () => (active === 'All' ? SKILLS : SKILLS.filter((s) => s.category === active)),
    [active]
  )

  return (
    <section id="skills" className="relative py-200 md:py-8 px-6 md:px-10 max-w-6xl mx-auto overflow-hidden">
      <SectionLabel index={2} total={6} title="Skills" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-lg">
          <h3 className="font-display text-3xl md:text-4xl tracking-tight mb-4">
            A stack tuned for both interface and infrastructure.
          </h3>
          <p style={{ color: 'var(--muted)' }}>
            From front-end interaction design to back-end systems, plus the
            project-management and communication skills that keep teams
            shipping on time.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              data-cursor-hover
              onClick={() => setActive(cat)}
              className="font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-full border transition-colors"
              style={{
                borderColor: active === cat ? 'var(--accent)' : 'var(--line)',
                color: active === cat ? 'var(--accent)' : 'var(--muted)',
                background: active === cat ? 'rgba(201,164,106,0.08)' : 'transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -right-10 -top-16 w-56 h-56 opacity-70 hidden lg:block pointer-events-none">
          <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}>
            <DecorativeCore />
          </Canvas>
        </div>
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
{/* 
      <FloatingArt
        src="/art/ring-statue.png"
        width={250}
        delay={0.15}
        className="absolute -right-4 left-100 -bottom-35 z-100 opacity-270"
      /> */}
    </section>
  )
}
