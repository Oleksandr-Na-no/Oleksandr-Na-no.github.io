import React from 'react'

type Props = {
  className?: string;
  setCategory: React.Dispatch<React.SetStateAction<number>>;
  category: number;
};

function CategoryDropDown({ className, setCategory, category}: Props) {
  return (
    <div className={`${className}`}>
      <select
        value={category}
        onChange={(e) => setCategory(Number(e.target.value))}
        className="text-black aspect-[10/1] w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="1">Звичайні фото</option>
        <option value="2">Портрети</option>
        <option value="3">Пейзажі</option>
        <option value="4">Макрозйомка</option>
      </select>
    </div>
  );
}

export default CategoryDropDown