import { lessons } from "../data/Lessons";
import { useEffect, useState } from "react";

type LessonProgress = {
  id: number;
  done: boolean;
};

function ProgressTable() {
  const [progress, setProgress] = useState<LessonProgress[]>([]);

  useEffect(() => {
    const storedProgress = JSON.parse(
      localStorage.getItem("Progress") ?? "[]"
    ) as LessonProgress[];
    setProgress(storedProgress);
  }, []);

  const isDone = (id: number) =>
    progress.find((p) => p.id === id)?.done ?? false;

        // <table className="w-full bg-gray-200 text-sm text-black rounded-lg">
        //   <tbody>
        //     <tr className="border-b border-gray-300">
        //       <td className="px-2 py-1 w-6"></td>

  return (
    <div className="w-full flex flex-col items-center rounded-xl border-2 border-white overflow-hidden">
      <table className="w-full h-full table-auto text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 w-32">Статус</th>
            <th className="border-l px-4 py-2">Назва уроку</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id}>
              <td className="border-t  px-4 py-2 text-center text-xl">
                {isDone(lesson.id) ? "✅" : "❌"}
              </td>
              <td className="border-l border-t px-4 py-2">{lesson.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProgressTable;
