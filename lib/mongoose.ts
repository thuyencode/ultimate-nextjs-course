import mongoose from 'mongoose'
import logger from './logger'

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined')
}

const {
  env: { MONGODB_URI }
} = process

interface MongooseCache {
  conn: mongoose.Mongoose | null
  promise: Promise<mongoose.Mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var -- This is fine
  var mongoose: MongooseCache | undefined
}

let { mongoose: cached } = global

cached ??= global.mongoose = { conn: null, promise: null }

export { MONGODB_URI }

const dbConnect = async (): Promise<mongoose.Mongoose> => {
  if (cached.conn) {
    logger.info('Using existing mongoose connection')
    return cached.conn
  }

  cached.promise ??= mongoose
    .connect(MONGODB_URI, { dbName: 'devflow' })
    .then((result) => {
      logger.info('Connected to MongoDB')

      return result
    })
    .catch((error: unknown) => {
      logger.error('Error connecting to MongoDB', error)

      // eslint-disable-next-line @typescript-eslint/only-throw-error -- This is fine
      throw error
    })

  cached.conn = await cached.promise

  return cached.conn
}

export default dbConnect
