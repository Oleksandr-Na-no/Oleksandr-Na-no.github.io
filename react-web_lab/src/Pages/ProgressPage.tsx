import { LessonProgress } from "./LessonPage";
import { lessons } from "../data/Lessons.ts";
import ProgressTable from "../components/ProgressTable.tsx";

function ProgressPage() {
  const lessonsProgress = JSON.parse(
    localStorage.getItem("Progress") ?? "[]"
  ) as LessonProgress[];

  const percent =
    (lessonsProgress.filter((lesson) => lesson.done).length / lessons.length) *
    100;

  return (
    <div className="mt-[80px] w-full max-w-[600px] h-full flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl mb-16">Твій прогрес</h1>

      <h2 className="text-2xl mb-4">Пройдено {percent}%</h2>

      <div className="w-full h-6 bg-gray-300 rounded-full overflow-hidden mb-16">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <ProgressTable />
    </div>
  );
}

export default ProgressPage;
