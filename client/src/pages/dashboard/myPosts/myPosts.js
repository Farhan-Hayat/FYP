import { useEffect, useState } from "react";
import useGetUserPosts from "../../../hooks/post/getUserPostsHook";
import useDeleteUserPost from "../../../hooks/post/DeleteUserPostHook";
const MyPosts = () => {
  const [myPosts , setMyPosts]=useState([])
  const {getUserPosts} = useGetUserPosts()
  const {deleteUserPost}= useDeleteUserPost()
  const fetchPosts =async ()=>{
    const res = await getUserPosts()
    if(res.ok){
      setMyPosts(res.data)
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
    <div>
      {myPosts.length>0 && myPosts.map(post=>(
        <div key={post._id}>
          {post.description && <p>{post.description}</p>}
          {post.imageUrl && <img src={post.imageUrl} />}
          <button onClick={()=>handleDelete(post._id)}>Delete</button>
        </div>
      )) }
    </div>
   );
}
 
export default MyPosts;