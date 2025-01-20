/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import { model, models, Schema, type Types } from 'mongoose'

interface VoteDefinition {
  author: Types.ObjectId
  id: Types.ObjectId
  type: 'question' | 'answer'
  voteType: 'upvote' | 'downvote'
}

const VoteSchema = new Schema<VoteDefinition>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ['question', 'answer'], required: true },
    voteType: { type: String, enum: ['upvote', 'downvote'], required: true }
  },
  {
    timestamps: true
  }
)

const Vote = models?.vote || model<VoteDefinition>('Vote', VoteSchema)

export { Vote, type VoteDefinition }
