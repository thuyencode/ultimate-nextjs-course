/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import { model, models, Schema, type Types } from 'mongoose'

const ACTIONS = ['view', 'post', 'upvote', 'downvote'] as const
const TYPES = ['question', 'answer'] as const

type Action = (typeof ACTIONS)[number]
type Type = (typeof TYPES)[number]

interface InteractionDefinition {
  user: Types.ObjectId
  action: Action
  actionId: Types.ObjectId
  actionType: Type
}

const InteractionSchema = new Schema<InteractionDefinition>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, enum: ACTIONS, required: true },
    actionId: { type: Schema.Types.ObjectId, required: true },
    actionType: { type: String, enum: TYPES, required: true }
  },
  {
    timestamps: true
  }
)

const Interaction =
  models?.interaction ||
  model<InteractionDefinition>('Interaction', InteractionSchema)

export { Interaction, type InteractionDefinition }
