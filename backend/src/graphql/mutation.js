import { GraphQLError } from 'graphql'
import { createUser, loginUser } from '../services/users.js'
import { createPost, likePost } from '../services/posts.js' //add likePost
export const mutationSchema = `#graphql
type Mutation {
signupUser(username: String!, password: String!): User
loginUser(username: String!, password: String!): String
createPost(title: String!, contents: String, image: String, tags:[String]): Post
likePost(id: ID!): Post
}
`
export const mutationResolver = {
  Mutation: {
    signupUser: async (parent, { username, password }) => {
      return await createUser({ username, password })
    },
    loginUser: async (parent, { username, password }) => {
      return await loginUser({ username, password })
    },
    createPost: async (
      parent,
      { title, contents, image, tags },
      { auth, io },
    ) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          },
        )
      }
      const post = await createPost(auth.sub, { title, contents, image, tags })
      io.emit('newRecipe', { id: post.id, title: post.title })
      return post
    },
    likePost: async (parent, { id }, { auth }) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          },
        )
      }
      return await likePost(id)
    },
  },
}
