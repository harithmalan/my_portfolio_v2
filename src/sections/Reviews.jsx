import { useEffect, useState, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquarePlus } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import ReviewCard from '../components/ReviewCard'
import ReviewForm from '../components/ReviewForm'
import FloatingArt from '../components/FloatingArt'
import AssetErrorBoundary from '../components/AssetErrorBoundary'
import ButterflyModel from '../components/three/ButterflyModel'
import { supabase, supabaseEnabled } from '../lib/supabase'
import { fallbackReviews } from '../lib/reviewsData'

export default function Reviews() {
  const [reviews, setReviews] = useState(fallbackReviews)
  const [loading, setLoading] = useState(supabaseEnabled)
  const [showForm, setShowForm] = useState(false)

  const load = async () => {
    if (!supabaseEnabled) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(9)
      if (error) throw error
      if (data && data.length > 0) setReviews(data)
    } catch (err) {
      console.warn('Falling back to seed reviews:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <section id="reviews" className="relative py-20 md:py-28 px-6 md:px-10 max-w-6xl mx-auto overflow-hidden">
      <SectionLabel index={5} total={6} title="Reviews" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <h3 className="font-display text-3xl md:text-4xl tracking-tight max-w-lg">
          What people say after working with me.
        </h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            data-cursor-hover
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-5 py-3 rounded-full border transition-colors self-start md:self-auto hover:border-white"
            style={{ borderColor: 'var(--signal-dim)', color: 'var(--signal)' }}
          >
            <MessageSquarePlus size={15} /> Leave a Review
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-12"
          >
            <ReviewForm
              onDone={() => {
                setShowForm(false)
                load()
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>LOADING REVIEWS…</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <ReviewCard key={r.id} review={r} index={i} />
          ))}
        </div>
      )}

      
      {/* <div className="hidden lg:block absolute left-0 bottom-0 w-100 h-100 z-0 pointer-events-none opacity-90">
        <AssetErrorBoundary>
          <Suspense fallback={null}>
            <ButterflyModel />
          </Suspense>
        </AssetErrorBoundary>
      </div> */}
    </section>
  )
}
