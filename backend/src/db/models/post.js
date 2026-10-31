import mongoose, { Schema } from 'mongoose'
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: String,
    image: String,
    likes: { type: Number, default: 0 }, // added like and initialize to zero
    tags: [String],
  },
  { timestamps: true },
)
export const Post = mongoose.model('post', postSchema)
