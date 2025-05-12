import ImageCard from "./ImageCard";
import {ImageObject} from "../../Pages/GalleryPage"
import { useState } from "react";
type Props = {
  className?: string;
  imgList: ImageObject[];
  category: number;
  setImgList: React.Dispatch<React.SetStateAction<ImageObject[]>>;
};

function ImageList({ className, imgList, category, setImgList }: Props) {
  const [fullScreen, setFullScreen] = useState(0);

  return (
    <>
      <div
        className={`grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-auto ${className}`}
      >
        {imgList
          .filter((img) => img.category === category)
          .map((img) => (
            <ImageCard
              key={img.id}
              img={img}
              onClick={() => {
                setFullScreen(img.id);
              }}
              onLeftClick={(e) => {
                e.preventDefault();
                const newImgList = imgList.filter((i) => i.id !== img.id);
                localStorage.setItem("images", JSON.stringify(newImgList));
                setImgList(newImgList);
              }}
            />
          ))}
      </div>
      {Boolean(fullScreen) && (
        <div
          id="fullScreen"
          className="fixed inset-0 z-[100] flex items-center justify-center m-5 rounded-[10px] max-w-full max-h-full"
          onClick={() => setFullScreen(0)}
        >
          <img
            src={imgList.find((img) => img.id === fullScreen)?.src || ""}
            alt="photo"
            className="max-w-full max-h-full object-contain rounded-[10px]"
          />
        </div>
      )}
    </>
  );
}

export default ImageList