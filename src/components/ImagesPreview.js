import React from "react";

const ImagesPreview = ({ url, heading }) => {
  return (
    <>
      {url && (
        <div className="right-heading">
          <h1 className="preview-img-heading">{heading}</h1>
          <div className="preview-image">
            <img src={url} alt="image" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </>
  );
};

export default ImagesPreview;
