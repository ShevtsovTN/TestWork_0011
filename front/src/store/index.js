import { createStore, createLogger } from 'vuex'
import comments from './modules/comments'
import posts from './modules/posts'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    comments,
    posts
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
