import type { ImageProps } from 'next/image'

export interface Tag {
  _id: string
  name: string
}

export interface Author {
  _id: string
  name: string
  image: ImageProps['src']
}

export interface Question {
  _id: string
  title: string
  description: string
  tags: Tag[]
  author: Author
  createdAt: Date
  upvotes: number
  answers: number
  views: number
}
