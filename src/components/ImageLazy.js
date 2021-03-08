import React, { useRef } from "react";
import useImageLazy from "../hooks/useImageLazy";

export const ImageLazy = ({ thumbnail, highResImage, altText }) => {
  const imageElement = useRef();
  const imageSrc = useImageLazy(imageElement, thumbnail, highResImage);

  return (
    <img
      ref={imageElement}
      src={imageSrc}
      data-src={highResImage}
      alt={altText}
    />
  );
};
