import { TECHS_MAP } from '@/constants'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const getDeviconClassName = (techName: string): string => {
  const normalizedTechName = techName.replace(/[ .]/g, '').toLowerCase()

  return TECHS_MAP[normalizedTechName]
    ? `${TECHS_MAP[normalizedTechName]} colored`
    : 'devicon-devicon-plain'
}

const units = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'week', seconds: 604800 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 }
]

export const getTimeStamp = (date: Date): string => {
  const now = new Date()
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000)

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds)

    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? 's' : ''} ago`
    }
  }

  return 'just now'
}
