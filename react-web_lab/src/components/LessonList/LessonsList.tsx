import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import LessonCard from "./LessonCard.tsx";
import style from "./LessonsList.module.css";
import { db } from "../../firebase/firebase";

// Define the Lesson type
export type Lesson = {
  id: number;
  name: string;
  imgPath: string;
  text: string;
  videoLink: string;
};

export function LessonList() {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Lessons"), (snapshot) => {
      const data: Lesson[] = snapshot.docs.map((doc) => {
        const lessonData = doc.data();

        return {
          id: parseInt(doc.id), // or use `doc.id` directly if you change id to `string`
          name: lessonData.name,
          imgPath: lessonData.imgPath,
          text: lessonData.text,
          videoLink: lessonData.videoLink,
        };
      });

      setLessons(data);
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <div className={style.container}>
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}

export default LessonList;
