import { useRef, useState, useEffect } from "react";
import CategoryDropDown from "./CategoryDropDown";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setImgList: (images: any[]) => void;
};

function AddImageMenu({ isOpen, setIsOpen, setImgList }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState(1);

  const addNewImage = () => {
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      alert("Виберіть файл");
      return;
    }

    const images = JSON.parse(localStorage.getItem("images") || "[]");
    let filesProcessed = 0;

    useEffect(() => {setCategory(0)}, [isOpen]);

    for (let file of Array.from(files)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const newImage = {
          id: Date.now() + filesProcessed,
          src: reader.result,
          category: Number(category),
        };
        images.push(newImage);
        filesProcessed++;

        if (filesProcessed === files.length) {
          localStorage.setItem("images", JSON.stringify(images));
          setImgList(images);
          setIsOpen(false);
        }
      };
    }
  };

  return (
    <>
      {isOpen && (
        <div className="text-black backdrop-blur-md fixed inset-0 z-[98] flex items-center justify-center">
          <div className="bg-white p-5 rounded-md flex flex-col items-center gap-5">
            <label className="text-3xl">Добавити фото</label>
            <input
              ref={fileInputRef}
              className="hover:scale-102 duration-300 ease-in-out w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              type="file"
              multiple
              accept="image/*"
              name="filename"
            />
            <div className="flex flex-col w-full gap-2.5 text-sm">
              <label>Виберіть категорію:</label>

              <CategoryDropDown
                className="w-full"
                setCategory={setCategory}
                category={category}
              />

            </div>
            <div className="w-full flex justify-evenly gap-2.5">
              <button
                className="hover:scale-102 w-full aspect-[5/1] bg-gray-200 hover:bg-gray-300 rounded-md transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={addNewImage}
                className="hover:scale-102 w-full aspect-[5/1] bg-green-400 hover:bg-green-500 rounded-md transition-all duration-300"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddImageMenu;