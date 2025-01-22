/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import { model, models, Schema, type Document, type Types } from 'mongoose'

export interface TagQuestionDefinition {
  tagId: Types.ObjectId
  question: Types.ObjectId
}

export type TagQuestionDoc = TagQuestionDefinition & Document

const TagQuestionSchema = new Schema<TagQuestionDefinition>(
  {
    tagId: { type: Schema.Types.ObjectId, ref: 'Tag', required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true }
  },
  {
    timestamps: true
  }
)

export const TagQuestion =
  models?.tagQuestion ||
  model<TagQuestionDefinition>('TagQuestion', TagQuestionSchema)
