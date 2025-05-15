import { LessonProgress } from "./LessonPage";
import { lessons } from "../data/Lessons.ts";
import ProgressTable from "../components/ProgressTable.tsx";
import ProgressBar from "../components/ProgressBar.tsx";
import { useAuth } from "../context/authContext";

function ProgressPage() {
  const { userLoggedIn } = useAuth();
  const lessonsProgress = JSON.parse(
    localStorage.getItem("Progress") ?? "[]"
  ) as LessonProgress[];

  const percent =
    (lessonsProgress.filter((lesson) => lesson.done).length / lessons.length) *
    100;

  return (
    <>
      {userLoggedIn ? (
        <div className="w-full max-w-[600px] h-full flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl mb-16">Твій прогрес</h1>

          <ProgressBar percent={percent} />
          <ProgressTable />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-lg mb-4">
            Увійдіть, щоб переглянути свій прогрес.
          </p>
        </div>
      )}
    </>
  );
}

export default ProgressPage;
