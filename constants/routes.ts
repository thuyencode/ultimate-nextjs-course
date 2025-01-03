export const ROUTES = {
  HOME: '/',
  LOG_IN: '/log-in',
  REGISTER: '/register',
  COMMUNITY: '/community',
  COLLECTION: '/collection',
  TAGS: '/tags',
  PROFILE: '/profile',
  ASK: '/ask-question',
  JOBS: '/jobs',
  QUESTION: (id: string) => `/questions/${id}`,
  TAG: (id: string) => `/tags/${id}`
} as const
