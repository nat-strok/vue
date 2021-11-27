import PostsList from '../views/PostsList'
import SinglePost from '../views/SinglePost'
import UserCard from '@/components/UserCard'
import Menu from "@/components/Menu";
import SubNav from "@/components/SubNav";

export default [
  {
    path: '/posts-list',
    name: 'All Posts',
    components: {
      default: PostsList,
      menu: Menu,
      subNav: SubNav
    }
  },
  {
    path: '/post-:postId',
    name: 'SinglePost',
    components: {
      default: SinglePost,
      menu: Menu,
      subNav: SubNav
    },
    children: [
      {
        path: 'user-:userId',
        name: 'SinglePostAdd',
        components: {
          default: UserCard
        }
      }
    ]
  }
]