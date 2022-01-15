import React from "react";
import ContentLayout from "../../Components/Layout/ContentLayout";
import MainLayout from "../../Components/Layout/MainLayout";
import RightSidebarLayout from "../../Components/Layout/RightSidebarLayout";
import request from "../../Api/request";
import PostCard from '../../Components/PostCard/PostCard';
import ListFollow from '../../Components/Follow/ListFollow';
import ListPosts from "../../Components/ListPosts/ListPosts";
import useAuth from '../../hooks/useAuth';

export default function Home() {
  const userMe = useAuth();
  const [posts, setPosts] = React.useState([])
  const [skip, setSkip] = React.useState(0)
  const [load, setLoad] = React.useState(false)

  const fetchPosts = async (skip) => {
    setLoad(true)
    const res = await request({
      url: '/posts',
      params: {
        skip: skip
      },
      method: 'GET',
    })
    if (res.data) {
      setLoad(false)
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
    setLoad(true)
    const newSkip = (skip +4)
    const data =  await fetchPosts(skip)
    setPosts(prePosts=> [...prePosts, ...data])
    setSkip(newSkip)
    setLoad(false)
  }

  return (
    <MainLayout>
      <ContentLayout>
        <div className='text-center my-2'>
          <h4>Home</h4>
        </div>
        <div className='flex-grow-1 overflow-auto'>
          <ListPosts posts={posts} load={load} scrollData={scrollData}/>
        </div>
      </ContentLayout>
      <RightSidebarLayout>
        <ListFollow userIdProfile={userMe._id} page='home-following' />
      </RightSidebarLayout>
    </MainLayout>
  )
}