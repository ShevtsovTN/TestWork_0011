import Main from '@/pages/Main'
import Posts from '@/pages/Posts'
import Post from '@/pages/Post'
import Comments from '@/pages/Comments'

export default [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: Posts,
  },
  {
    path: '/posts/edit/:id',
    component: Post,
  },
  {
    path: '/comments',
    component: Comments,
  }
]
