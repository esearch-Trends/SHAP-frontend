import React, { useState } from 'react'
import axios from 'axios';

import '../styles/main.css'

const HomePage = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const TransformFileData = (file) => {
    const reader = new FileReader();
    
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

  const handleImageUpload = async(e) =>{
    const file = e.target.files[0];
    
    TransformFileData(file);
  };

  const handleUpload = async () => {
    setLoading(true);

    const params = {
      "baseImg": image,
    }
    try {
      const response = await axios.post("http://127.0.0.1:5000/predictResult", null, {
        params: params,
      })

      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

    
  return (
    <div className='container'>
        <h1>ECG Image Classification using SHAP</h1>
        <input 
          type='file'
          name='pred_img'
          content='image/*'
          onChange={handleImageUpload}
        />
        <button className='select-image' onClick={handleUpload}>Predict Image</button>
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
            <div>Predicting Image...</div>
          </div>
        )}
        {data.condition && <p className="condition">{data.condition}</p>}
        {data.base_img && <img src={`data:image/*;base64,${data.base_img}`} alt="Base Image"  className='bsimg'/>}
        {data.pred_img && <img src={`data:image/*;base64,${data.pred_img}`} alt="Predicted Image" className='primg'/>}
    </div>
  )
}

export default HomePage