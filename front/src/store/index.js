import { createStore, createLogger } from 'vuex'
import comments from '@/store/modules/comments'
import posts from '@/store/modules/posts'
import data from '@/store/modules/data'
import user from '@/store/modules/user'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    comments,
    posts,
    data,
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
