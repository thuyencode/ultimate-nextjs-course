/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import { model, models, Schema, type Document, type Types } from 'mongoose'

export interface QuestionDefinition {
  title: string
  content: string
  tags?: Types.ObjectId
  views?: number
  answers?: number
  upvotes?: number
  downvotes?: number
  author: Types.ObjectId
}

export type QuestionDoc = QuestionDefinition & Document

const QuestionSchema = new Schema<QuestionDefinition>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    views: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
)

export const Question =
  models?.question || model<QuestionDefinition>('Question', QuestionSchema)
