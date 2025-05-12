type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddImageButton({ setIsOpen }: Props) {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="  
      text-black
      text-2xl
    bg-white
    fixed
    bottom-0
    right-0
    m-2
    z-[99]
    rounded-md
    p-2
    transition
    duration-500
    ease-in-out
    hover:bg-green-300
    hover:shadow-[1px_1px_2px_3px_#ffffff54]
    hover:scale-102
          "
    >
      Добавити фото
    </button>
  );
}

export default AddImageButton;
