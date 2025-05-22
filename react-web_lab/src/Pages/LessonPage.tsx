import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, getIdToken } from "firebase/auth";
import { db } from "../firebase/firebase";
import LessonDoneAlert from "../components/LessonDoneAlert.tsx";
import { beckEndServerUrl } from "../../settings.ts";

export type LessonProgress = {
  completed: boolean;
  date: string | Date | null;
  dateLine: string | Date | null;
};

export type Lesson = {
  id: number;
  name: string;
  imgPath: string;
  text: string;
  videoLink: string;
};

// Utility function to safely convert any date-like value to Date
const convertToDate = (dateValue: any): Date | null => {
  if (!dateValue) return null;

  // If it's already a Date object
  if (dateValue instanceof Date) {
    return isNaN(dateValue.getTime()) ? null : dateValue;
  }

  // If it's a Firebase Timestamp
  if (
    dateValue &&
    typeof dateValue === "object" &&
    (dateValue.seconds || dateValue._seconds)
  ) {
    const seconds = dateValue.seconds ?? dateValue._seconds;
    const date = new Date(seconds * 1000);
    return isNaN(date.getTime()) ? null : date;
  }

  // If it's a string
  if (typeof dateValue === "string") {
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? null : date;
  }

  return null;
};

// Utility function to safely format date to ISO string
const safeToISOString = (date: Date | null): string => {
  if (!date || isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  return date.toISOString();
};

// Utility function to safely format date for input
const safeToInputString = (date: Date | null): string => {
  if (!date || isNaN(date.getTime())) {
    return new Date().toISOString().split("T")[0];
  }
  return date.toISOString().split("T")[0];
};

function LessonPage() {
  const { id } = useParams();
  const lessonId = Number(id);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dateLine, setDateLine] = useState<Date | null>(new Date());

  const handleDateChange = async (newDate: Date) => {
    setDateLine(newDate);
    await updateLessonProgress(undefined, newDate);
  };

  // Функція для перемикання стану виконання уроку
  const toggleLessonCompletion = async () => {
    const newState = !isDone;
    await updateLessonProgress(newState);
  };

  // Fetch lesson details
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const docRef = doc(db, "Lessons", id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLesson({
            id: parseInt(docSnap.id),
            name: data.name,
            imgPath: data.imgPath,
            text: data.text,
            videoLink: data.videoLink,
          });
        } else {
          setLesson(null);
        }
      } catch (err) {
        console.error("Error loading lesson:", err);
        setError("Failed to load lesson.");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  // Update progress
  const updateLessonProgress = async (
    newCompletionState?: boolean,
    customDateLine?: Date
  ) => {
    setError(null);
    setUpdating(true);

    const user = getAuth().currentUser;
    if (!user) {
      setError("You must be logged in to update lesson progress");
      setUpdating(false);
      return;
    }

    // Визначаємо стан завершення
    const completionState =
      newCompletionState !== undefined ? newCompletionState : isDone;

    // Визначаємо дату дедлайну
    const effectiveDateLine = customDateLine || dateLine || new Date();
    const formattedDateLine = safeToISOString(effectiveDateLine);

    try {
      const token = await getIdToken(user);
      const response = await fetch(
        `${beckEndServerUrl}/user/lesson/${lessonId}?state=${completionState}&dateLine=${formattedDateLine}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update lesson progress");
      }

      // Оновлюємо локальний стан тільки після успішного запиту
      setIsDone(completionState);
      setDateLine(effectiveDateLine);
    } catch (error) {
      console.error("Error updating lesson progress:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setUpdating(false);
    }
  };

  // Fetch current progress
  useEffect(() => {
    const fetchProgress = async () => {
      const user = getAuth().currentUser;
      if (!user) {
        setIsDone(false);
        return;
      }

      try {
        const token = await getIdToken(user);
        const response = await fetch(
          `${beckEndServerUrl}/user/lesson/${lessonId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 404) {
          setIsDone(false);
          setDateLine(new Date());
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch lesson progress");
        }

        const data = (await response.json()) as LessonProgress;

        setIsDone(data.completed);

        // Safely convert dateLine to Date
        const convertedDateLine = convertToDate(data.dateLine);
        setDateLine(convertedDateLine || new Date());
      } catch (error) {
        console.error("Error fetching progress:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    };

    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        fetchProgress();
      } else {
        setIsDone(false);
        setDateLine(new Date());
      }
    });

    return () => unsubscribe();
  }, [lessonId]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg text-gray-600">
        Loading lesson...
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center mt-20 text-lg text-gray-600">
        Lesson not found
      </div>
    );
  }

  return (
    <main className="mt-[10vh] flex items-center justify-center p-4">
      <LessonDoneAlert number={lesson.id} isDone={isDone} />
      <div className="max-w-xl w-full text-center">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

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

        <div className="flex justify-center mb-6 gap-2">
          <button
            className={
              "px-4 py-2 text-white rounded-lg text-sm transition-colors " +
              (isDone
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600") +
              (updating ? " opacity-50 cursor-not-allowed" : "")
            }
            onClick={toggleLessonCompletion}
            disabled={updating}
          >
            {updating
              ? "Оновлення..."
              : isDone
              ? "Зроблено ✅"
              : "Позначити як зроблене"}
          </button>

          <div className="flex items-center bg-blue-500 p-2 rounded-lg text-white">
            <div className="mr-2">Дедлайн:</div>
            <input
              type="date"
              className="text-black px-2 py-1 rounded"
              value={safeToInputString(dateLine)}
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              disabled={updating}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default LessonPage;
