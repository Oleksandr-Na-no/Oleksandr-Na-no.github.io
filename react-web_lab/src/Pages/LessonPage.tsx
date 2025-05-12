import { useParams } from "react-router-dom";
import { lessons } from "../data/Lessons.ts";
import { useState, useEffect } from "react";

export type LessonProgress = {
  id: number;
  done: boolean;
};

function LessonPage() {
  //localStorage.removeItem("Progress");

  const { id } = useParams();

  const lesson = lessons.find((lesson) => lesson.id === Number(id));

  if (!lesson) {
    return (
      <div className="text-center mt-20 text-lg text-gray-600">
        Lesson not found
      </div>
    );
  }
  const lessonsProgress = JSON.parse(
    localStorage.getItem("Progress") ?? "[]"
  ) as LessonProgress[];

  const [isDone, setIsDone] = useState(
    lessonsProgress.find((lesson) => lesson.id === Number(id))?.done ?? false
  );

  const SetDone = () => {
    if (isDone) {
      setIsDone(false);
    } else {
      setIsDone(true);
    }
  };
useEffect(() => {
  const storedProgress = JSON.parse(
    localStorage.getItem("Progress") ?? "[]"
  ) as LessonProgress[];

  const index = storedProgress.findIndex((p) => p.id === Number(id));
  if (index !== -1) {
    storedProgress[index].done = isDone;
  } else {
    storedProgress.push({ id: Number(id), done: isDone });
  }

  localStorage.setItem("Progress", JSON.stringify(storedProgress));
}, [isDone, id]);

  return (
    <main className="mt-[10vh] flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">{lesson.name}</h1>
        <iframe
          className="rounded-md mx-auto mb-6"
          width="560"
          height="315"
          src={lesson.videoLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <p className="text-primary mb-6">{lesson.text}</p>
        <button
          className={
            "px-4 py-2 text-white rounded-lg text-sm" +
            (isDone ? " bg-green-500" : " bg-blue-500")
          }
          onClick={SetDone}
        >
          {isDone ? "Зроблено ✅" : "Позначити як зроблене"}
        </button>
      </div>
    </main>
  );
}

export default LessonPage;
