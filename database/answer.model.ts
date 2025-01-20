/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is fine */
import {
  model,
  models,
  Schema,
  type InferRawDocType,
  type SchemaDefinition
} from 'mongoose'

const answerSchemaDefinition = {
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  content: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 }
} satisfies SchemaDefinition

type AnswerDefinition = InferRawDocType<typeof answerSchemaDefinition>

const AnswerSchema = new Schema<AnswerDefinition>(answerSchemaDefinition, {
  timestamps: true
})

const Answer = models?.answer || model<AnswerDefinition>('Answer', AnswerSchema)

export { Answer, type AnswerDefinition }
