/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import { model, models, Schema, type Document, type Types } from 'mongoose'

export interface AnswerDefinition {
  author: Types.ObjectId
  question: Types.ObjectId
  content: string
  upvotes?: number
  downvotes?: number
}

export type AnswerDoc = AnswerDefinition & Document

const AnswerSchema = new Schema<AnswerDefinition>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
)

export const Answer =
  models?.answer || model<AnswerDefinition>('Answer', AnswerSchema)
