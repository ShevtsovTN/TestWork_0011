import Main from '@/pages/Main'
import Posts from '@/pages/Posts'
import Post from '@/pages/Post'
import Comments from '@/pages/Comments'
import PostsLayout from '@/pages/PostsLayout'
import PostCreate from '@/pages/PostCreate'
import PostEdit from '@/pages/PostEdit'
import CommentCreate from '@/pages/CommentCreate'
import LoginPage from '@/pages/LoginPage'

export default [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: '',
        name: 'posts',
        component: Posts
      },
      {
        path: ':postId',
        name: 'post',
        component: Post
      },
      {
        path: 'edit/:postId',
        name: 'editPost',
        component: PostEdit
      },
      {
        path: 'create',
        name: 'createPost',
        component: PostCreate
      },
      {
        path: ':postId/comment/create',
        name: 'createComment',
        component: CommentCreate
      }
    ]
  },
  {
    path: '/comments',
    name: 'comments',
    component: Comments
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  }
]
