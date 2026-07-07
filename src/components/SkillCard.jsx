import { motion } from 'framer-motion'

export default function SkillCard({ skill, index }) {
  const Icon = skill.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      data-cursor-hover
      className="group relative p-5 rounded-xl border overflow-hidden"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{ background: 'radial-gradient(120px circle at 30% 20%, rgba(201,164,106,0.16), transparent 70%)' }}
      />
      <div className="relative">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
          style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}
        >
          <Icon size={18} strokeWidth={1.6} />
        </div>
        <p className="font-display text-base mb-3">{skill.name}</p>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="h-1 flex-1 rounded-full transition-colors duration-500"
              style={{
                background: i < skill.level ? 'var(--accent)' : 'var(--line)',
                transitionDelay: `${i * 60}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
