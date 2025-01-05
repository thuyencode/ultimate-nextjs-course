import { ASSETS } from './assets'
import { ROUTES } from './routes'

export const SIDEBAR_LINKS = [
  {
    imgURL: ASSETS.HOME_ICON,
    route: '/',
    label: 'Home'
  },
  {
    imgURL: ASSETS.USERS_ICON,
    route: ROUTES.COMMUNITY,
    label: 'Community'
  },
  {
    imgURL: ASSETS.START_ICON,
    route: ROUTES.COLLECTION,
    label: 'Collections'
  },
  {
    imgURL: ASSETS.SUITCASE_ICON,
    route: ROUTES.JOBS,
    label: 'Find Jobs'
  },
  {
    imgURL: ASSETS.TAG_ICON,
    route: ROUTES.TAGS,
    label: 'Tags'
  },
  {
    imgURL: ASSETS.USER_ICON,
    route: '/profile',
    label: 'Profile'
  },
  {
    imgURL: ASSETS.QUESTION_ICON,
    route: ROUTES.ASK,
    label: 'Ask a question'
  }
]

export * from './assets'
export * from './routes'
export * from './techs-map'
