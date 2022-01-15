import React from "react";
import PostCard from '../PostCard/PostCard';
import InfiniteScroll from "react-infinite-scroll-component";
import request from "../../Api/request";
import LoadingPost from '../Loading/LoadingPost'

export default function ListPosts({posts, load, scrollData}) {

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
              <PostCard post={post} load={load} />
            </div>
          )
        })
      }
    </InfiniteScroll>

  )
}