import { useState, useEffect } from "react";

export default function useImage(watchImage) {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (watchImage?.[0]) {
      const imgURL = URL.createObjectURL(watchImage[0]);
      setImage(imgURL);
    }
  }, [watchImage]);

  return image;
}
