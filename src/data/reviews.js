// Demo reviews. Every entry is flagged isDemo: true so the UI can label them
// honestly and so the admin can filter demo vs. real. Replace via CMS in production.

export const reviews = [
  {
    id: 'r1',
    clientName: 'Demo Client',
    clientType: 'Local Service Business Owner',
    rating: 5,
    text: 'Fivo helped us improve our online presence and generate more qualified leads. The reporting finally made our marketing make sense.',
    image: '',
    isDemo: true,
  },
  {
    id: 'r2',
    clientName: 'Demo Client',
    clientType: 'Service Business',
    rating: 5,
    text: 'Their strategy made our ads more organized, measurable, and profitable. We always know what our budget is actually doing now.',
    image: '',
    isDemo: true,
  },
  {
    id: 'r3',
    clientName: 'Demo Client',
    clientType: 'Retail Business',
    rating: 5,
    text: 'Our brand finally looks professional and consistent across every platform. It changed how customers see us.',
    image: '',
    isDemo: true,
  },
  {
    id: 'r4',
    clientName: 'Demo Client',
    clientType: 'Home Services Company',
    rating: 5,
    text: 'Clear communication, real strategy, and a steady flow of better-fit leads. Exactly what we were missing before.',
    image: '',
    isDemo: true,
  },
]

export const getReviews = () => reviews
