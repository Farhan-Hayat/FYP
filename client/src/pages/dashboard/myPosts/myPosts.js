import { useEffect, useState } from "react";
import useGetUserPosts from "../../../hooks/post/getUserPostsHook";
import useDeleteUserPost from "../../../hooks/post/DeleteUserPostHook";
import "./myPosts.scss"
const MyPosts = () => {
  const [myPosts , setMyPosts]=useState([])
  const {getUserPosts} = useGetUserPosts()
  const {deleteUserPost}= useDeleteUserPost()
  const fetchPosts =async ()=>{
    const res = await getUserPosts()
    if(res.ok){
      setMyPosts(res.data.reverse())
    }else{
      console.log("error")
    }
  }

  const handleDelete = async   (postId)=>{
    console.log(postId)
    const res = await deleteUserPost(postId)
    if(res.ok){
      setMyPosts(myPosts.filter(item=>item._id!==res.data._id))
    }else{
      console.log("not deleted")
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  
  return ( 
    <div className="MyPosts">
      <h1>MY POSTS</h1>
      {myPosts.length>0 && myPosts.map(post=>(
        <div key={post._id} className="singlePost">
          <button onClick={()=>handleDelete(post._id)}>Delete</button>
          {post.description && <p>{post.description}</p>}
          {post.imageUrl && <img src={post.imageUrl} />}
        </div>
      )) }
      {
        myPosts.length<1 && <p>No posts to show</p>
      }
    </div>
   );
}
 
export default MyPosts;