import React from "react";
import PostCard from '../PostCard/PostCard';
import InfiniteScroll from "react-infinite-scroll-component";
import request from "../../Api/request";
import LoadingPost from '../Loading/LoadingPost'

export default function ListPosts() {
  const [posts, setPosts] = React.useState([])
  const [skip, setSkip] = React.useState(0)

  const fetchPosts = async (skip) => {
    const res = await request({
      url: '/posts',
      params: {
        skip: skip
      },
      method: 'GET',
    })
    if (res.data) {
      
      return res.data
    }
  }

  const renderPosts = async ()=> {
    const data = await fetchPosts(skip)
    setPosts(data)
  }

  React.useEffect(() => {
    renderPosts()
  }, [])

  const scrollData = async () => {
    console.log('render')
    console.log('skip', skip)
    const newSkip = (skip +4)
    const data =  await fetchPosts(skip)
    setPosts(prePosts=> [...prePosts, ...data])
    setSkip(newSkip)
  }


  return (

    <InfiniteScroll
      dataLength={posts.length} //This is important field to render the next data
      next={scrollData}
      hasMore={true}
      height='500px'
      loader={<LoadingPost/>}
    >
      {
        posts.map(post => {
          return (
            <div key={post._id} className="mb-3 bg-white p-2 rounded-3">
              <PostCard post={post} />
            </div>
          )
        })
      }
    </InfiniteScroll>

  )
}