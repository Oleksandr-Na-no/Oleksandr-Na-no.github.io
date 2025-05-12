import AddImageButton from "../components/AddImageButton"
import { useState} from "react";
import ImageList from "../components/ImageList/ImageList";
import AddImageMenu from "../components/AddImageMenu";
import CategoryDropDown from "../components/CategoryDropDown";
export type ImageObject = {
  id: number;
  src: string;
  category: number;
};

function GalleryPage() {
  // localStorage.removeItem("images");

    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState(1);
    const [imgList, setImgList] = useState<ImageObject[]>(
      (JSON.parse(localStorage.getItem("images") ?? "[]") as ImageObject[]).map(
        (img) => ({
          ...img,
          category: Number(img.category),
        })
      )
    );

  return (
    <div className="mt-[80px] ">
      <ImageList
        className="w-screen p-2"
        imgList={imgList}
        category={category}
        setImgList={setImgList}
      />
      <AddImageMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setImgList={setImgList}
      />
      <AddImageButton setIsOpen={setIsOpen} />
      <CategoryDropDown
        className="text-2xl fixed left-0 bottom-0 ml-2 mb-2 "
        setCategory={setCategory}
        category={category}
      />
    </div>
  );
}

export default GalleryPage