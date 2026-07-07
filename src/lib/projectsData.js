// Fallback / seed data — shown until Supabase has projects, or if
// Supabase hasn't been configured yet. Edit freely, or add real
// projects (with images!) through /admin once Supabase is wired up.

export const fallbackProjects = [
  {
    id: 'timbermill',
    title: 'Timbermill Management System',
    tagline: 'Enterprise web app',
    description:
      'A comprehensive web-based management system built for Wasana Timber Mill (Neluwa, Galle) — streamlining daily operations, inventory tracking, sales, and workflow through a fully responsive interface.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Tailwind CSS', 'PHP', 'SQL'],
    link: '',
    repo: '',
    image: '',
    featured: true,
    order_index: 1,
  },
  {
    id: 'qr-event',
    title: 'QR-Based Event Management System',
    tagline: 'SCU Awurudu 2026',
    description:
      'An end-to-end event registration and access control platform with secure payment-receipt uploads, automated QR code generation for attendees, and camera-based real-time admin attendance tracking at the gates.',
    tech: ['Angular', 'Supabase'],
    link: '',
    repo: '',
    image: '',
    featured: true,
    order_index: 2,
  },
  {
    id: 'task-inquiry',
    title: 'Task & User Inquiry Management',
    tagline: 'Enterprise dashboards',
    description:
      'Full-stack applications for managing user inquiries and tracking task workflows, with robust backend architecture and responsive frontend dashboards.',
    tech: ['Angular', 'Spring Boot', 'PostgreSQL'],
    link: '',
    repo: '',
    image: '',
    featured: false,
    order_index: 3,
  },
  {
    id: 'flood-detection',
    title: 'AI Flood Detection & Warning System',
    tagline: 'Machine learning',
    description:
      'A machine-learning-driven flood risk classification model integrated into a web application to predict, detect, and warn users of potential environmental hazards.',
    tech: ['Python (Flask)', 'Java', 'HTML', 'CSS'],
    link: '',
    repo: '',
    image: '',
    featured: false,
    order_index: 4,
  },
  {
    id: 'sunset-drive',
    title: 'Sunset Drive',
    tagline: '3D endless runner game',
    description:
      'An interactive 3D browser-based driving game with seamless gameplay mechanics, dynamic environments, and a real-time leaderboard registration system.',
    tech: ['React', 'React Three Fiber', 'Supabase'],
    link: '',
    repo: '',
    image: '',
    featured: true,
    order_index: 5,
  },
  {
    id: 'jungle-scape',
    title: 'Jungle Scape',
    tagline: '2D arcade web game',
    description:
      'An interactive, physics-based 2D web game featuring classic arcade-style obstacle-avoidance mechanics.',
    tech: ['React', 'Supabase'],
    link: '',
    repo: '',
    image: '',
    featured: false,
    order_index: 6,
  },
  {
    id: 'vibez-pizzapalace',
    title: 'VibeZ & PizzaPalace',
    tagline: 'E-commerce interfaces',
    description:
      'Modern, responsive front-end platforms for an online clothing retailer (VibeZ) and a digital pizza shop (PizzaPalace), focused on dynamic routing, component reusability, and fast load times.',
    tech: ['Next.js', 'Bootstrap', 'HTML', 'CSS', 'JavaScript'],
    link: '',
    repo: '',
    image: '',
    featured: false,
    order_index: 7,
  },
  {
    id: 'php-stores',
    title: 'ToyHeaven, GiftHeaven & BookNest',
    tagline: 'PHP e-commerce web stores',
    description:
      'A series of dynamic online storefronts with comprehensive product catalogs, shopping cart functionality, and user-friendly interfaces.',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    link: '',
    repo: '',
    image: '',
    featured: false,
    order_index: 8,
  },
]
