import { useEffect, useState } from "react";

/**
 * useImageLazy is a custom hook help you defer loading of images
 * @param {String} imageRef refference of image element
 * @param {String} highResImage actual image URL you want to load lazily
 * @param {Object} thumbnail image url which will be used to display as thumbnail before original image loaded
 */

export default function useImageLazy(imageRef, thumbnail, highResImage) {
  const [imageSrc, setImageSrc] = useState(thumbnail);

  useEffect(() => {
    let observer;

    // React gives warning if we don't keep the current refference point to a variable as it may change by the time of cleanup.
    const currentImage = imageRef.current;

    if (IntersectionObserver && imageRef && currentImage instanceof Element) {
      if (imageSrc !== highResImage) {
        observer = new IntersectionObserver(
          (images) => {
            images.forEach((image) => {
              // when the image will be visible + rootMargin
              if (image.isIntersecting) {
                // set actual image URL
                setImageSrc(image.target.dataset.src);

                // stop observing this element.
                observer.unobserve(image.target);
              }
            });
          },
          { threshold: 0, rootMargin: "0px 0px 100px 0px" } // 100px below (bottom) the viewport
        );

        // start observing the element
        observer.observe(currentImage);
      } else {
        // old browsers fallback
        setImageSrc(highResImage);
      }
    }

    return () => {
      // on component cleanup, remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(currentImage);
      }
    };
  }, [imageRef, thumbnail, highResImage, imageSrc]);

  return imageSrc;
}
