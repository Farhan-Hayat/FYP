import { useState } from "react";
import useUploadPost from "../../../hooks/post/uploadPostHook";
import useImageChange from "../../../utils/imageChange";
const UploadPost = () => {
  const [description, setDescription] = useState("");
  const {uploadPost} = useUploadPost();
  const { handleImageChange } = useImageChange();
  const [imageCode , setImageCode] = useState("")
  const handleSubmit = (e)=>{
    e.preventDefault()
    const body = {description:description?description:"",imageCode:imageCode?imageCode:""}
    if(description || imageCode){
      const res = uploadPost(body)
    }
    else{
      console.log("Please Enter Some Data")
    }
  }

  const handleImage = async (e) => {
    const base64Code = await handleImageChange(e);
    setImageCode(base64Code);
  };


  return (
    <div>
      <h1>Make a Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          label="image"
          id="image-upload"
          accept=".jpeg , .png , .jpg"
          onChange={handleImage}
        />
        <button>Upload</button>
      </form>
    {imageCode && <div>
      <img src={imageCode} alt="" /></div>}
    </div>
  );
};

export default UploadPost;
