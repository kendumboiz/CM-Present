import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Images } from "constants/images";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export const Avatar = ({ data, setFieldValue }) => {
  var [image, setImage] = useState(null);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // const img = URL.createObjectURL(e.target.files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        image = reader.result;
        setImage(image);
        console.log("🚀 ~ file: avatar.jsx ~ line 9 ~ Avatar ~ image", image);
        setFieldValue("image", image);
      };
    }
  };
  return (
    <>
      <div className="avatar">
        {image ? (
          <img className="preview_img" src={image} alt="preview_image" />
        ) : (
          <img src={data ? data.image : Images.DEFAULTUSER} alt="user_avt" />
        )}
      </div>
      <label className="avatar_change_icon">
        <FontAwesomeIcon
          className="icon"
          icon={faCamera}
          size="3x"
          style={{ color: "#464646" }}
        />
        <input onChange={onImageChange} name="file_avt" type="file" />
      </label>
    </>
  );
};
