/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import { model, models, Schema, type Document } from 'mongoose'

export interface TagDefinition {
  name: string
  questions?: number
}

export type TagDoc = TagDefinition & Document

const TagSchema = new Schema<TagDefinition>(
  {
    name: { type: String, required: true, unique: true },
    questions: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
)

export const Tag = models?.tag || model<TagDefinition>('Tag', TagSchema)
