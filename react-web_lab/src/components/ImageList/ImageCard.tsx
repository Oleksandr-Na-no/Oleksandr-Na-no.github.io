import React from "react";
import { ImageObject } from "../../Pages/GalleryPage";

type Props = {
  img: ImageObject;
  onClick: () => void;
  onLeftClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const ImageCard: React.FC<Props> = ({ img, onClick, onLeftClick }) => (
  <div onClick={onClick} className="flex" onContextMenu={onLeftClick}>
    <img
      src={img.src}
      alt={img.category.toString()}
      className="rounded-md w-full max-w-[600px] aspect-[4/3] object-cover"
    />
  </div>
);

export default ImageCard;
