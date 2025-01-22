/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import { model, models, Schema, type Types } from 'mongoose'

const TYPE = ['question', 'answer'] as const
const VOTE_TYPE = ['upvote', 'downvote'] as const

type Type = (typeof TYPE)[number]
type VoteType = (typeof VOTE_TYPE)[number]

interface VoteDefinition {
  author: Types.ObjectId
  id: Types.ObjectId
  type: Type
  voteType: VoteType
}

const VoteSchema = new Schema<VoteDefinition>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: TYPE, required: true },
    voteType: { type: String, enum: VOTE_TYPE, required: true }
  },
  {
    timestamps: true
  }
)

const Vote = models?.vote || model<VoteDefinition>('Vote', VoteSchema)

export { Vote, type VoteDefinition }
