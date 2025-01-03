import { TECHS_MAP } from '@/constants'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const getDeviconClassName = (techName: string): string => {
  const normalizedTechName = techName.replace(/[ .]/g, '').toLowerCase()

  return TECHS_MAP[normalizedTechName]
    ? `${TECHS_MAP[normalizedTechName]} `
    : 'devicon-devicon-plain'
}
