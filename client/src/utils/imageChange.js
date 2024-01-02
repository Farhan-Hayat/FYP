import { useState } from "react";
const useImageChange = () => {
  const [base64Image, setBase64Image] = useState("");
  
  //function
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const base64String = await new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
      setBase64Image(base64String);
      return base64String;
    }

    return null;
  };

  return { handleImageChange };
};

export default useImageChange;
