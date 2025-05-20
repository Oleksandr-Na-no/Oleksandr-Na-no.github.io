import { Lesson } from "../../data/Lessons.ts";
import style from "./LessonsList.module.css";
import { Link } from "react-router-dom";
import { beckEndServerUrl } from "../../../settings.ts";

type Props = {
  lesson: Lesson;
};

function LessonCard({ lesson}: Props) {
   const CardClass = `${style.item} ${
     style[`lesson-${((lesson.id - 1) % 5) + 1}`]
   }`;

   console.log(CardClass);

  return (
    <div className={CardClass}>
      <Link to={`/lesson/${lesson.id}`}>
        <img
          src={beckEndServerUrl + lesson.imgPath}
          alt={`Урок ${lesson.id}`}
          className={style.image}
        />
        <div className={style.inside}>
          <h2>{lesson.name}</h2>
        </div>
      </Link>
    </div>
  );
}

export default LessonCard;
