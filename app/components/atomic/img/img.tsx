import { useMemo } from "react";

export default function Img({ src, type }) {
  const imgSrc = useMemo(() => (src.includes('product_image') ? `/images/${type}/${src}` : src), [
    src,
    type,
  ]);

  return <img src={imgSrc} />;
}
