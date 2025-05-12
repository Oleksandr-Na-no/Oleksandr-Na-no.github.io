import { lessons } from "../../data/Lessons.ts";
import LessonCard from "./LessonCard.tsx";
import style from "./LessonsList.module.css";

export function LessonList() {
  console.log(lessons);

  return (
    <div className={style.container}>
      {lessons.map((lesson) => (
        <LessonCard lesson={lesson} />
      ))}
    </div>
  );
}

export default LessonList;
