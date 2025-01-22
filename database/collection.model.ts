/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import { model, models, Schema, type Document, type Types } from 'mongoose'

export interface CollectionDefinition {
  author: Types.ObjectId
  question: Types.ObjectId
}

export type CollectionDoc = CollectionDefinition & Document

const CollectionSchema = new Schema<CollectionDefinition>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true }
  },
  {
    timestamps: true
  }
)

export const Collection =
  models?.collection ||
  model<CollectionDefinition>('Collection', CollectionSchema)
