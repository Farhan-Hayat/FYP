import { useState } from "react";
import useUploadPost from "../../../hooks/post/uploadPostHook";
import useImageChange from "../../../utils/imageChange";
import "./uploadPost.scss";
const UploadPost = () => {
  const [description, setDescription] = useState("");
  const { uploadPost } = useUploadPost();
  const { handleImageChange } = useImageChange();
  const [imageCode, setImageCode] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      description: description ? description : "",
      imageCode: imageCode ? imageCode : "",
    };
    if (description || imageCode) {
      const res = await uploadPost(body);
      if(res.ok){
        setDescription("")
        setImageCode("")
        alert("Your Post has been uploaded, please browse to 'My Post' to see your uploaded post.")
      }
    } else {
      alert("Please Fill Any of One Field")
    }
  };

  const handleImage = async (e) => {
    const base64Code = await handleImageChange(e);
    setImageCode(base64Code);
  };

  return (
    <div className="UploadPost">
      <h1>Make a Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <textarea
          rows={4}
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
      <div className="imageCont">
        {imageCode && (
          <div>
            <img src={imageCode} alt="" />
          </div>
        )}
      </div>
      </form>
    </div>
  );
};

export default UploadPost;
