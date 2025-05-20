import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, getIdToken } from "firebase/auth";
import { db } from "../firebase/firebase";
import LessonDoneAlert from "../components/LessonDoneAlert.tsx";
import { beckEndServerUrl } from "../../settings.ts";

// Type for lesson progress data
export type LessonProgress = {
  completed: boolean;
  date: string | Date;
};

export type Lesson = {
  id: number;
  name: string;
  imgPath: string;
  text: string;
  videoLink: string;
};

function LessonPage() {
  const { id } = useParams();
  const lessonId = Number(id);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch lesson details from Firestore
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

  // Update lesson progress on server
  const updateLessonProgress = async (completed: boolean) => {
    setError(null);
    const user = getAuth().currentUser;
    if (!user) {
      setError("You must be logged in to update lesson progress");
      return;
    }

    try {
      const token = await getIdToken(user);
      const response = await fetch(
        `${beckEndServerUrl}/user/lesson/${lessonId}?state=${completed}`,
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

      setIsDone(completed);
    } catch (error) {
      console.error("Error updating lesson progress:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  // Fetch current lesson progress
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
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch lesson progress");
        }

        const data = (await response.json()) as LessonProgress;
        setIsDone(data.completed);
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
      }
    });

    return () => unsubscribe();
  }, [lessonId]);

  const toggleLessonStatus = () => {
    updateLessonProgress(!isDone);
  };

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
        <button
          className={
            "px-4 py-2 text-white rounded-lg text-sm" +
            (isDone ? " bg-green-500" : " bg-blue-500")
          }
          onClick={toggleLessonStatus}
          disabled={loading}
        >
          {isDone ? "Зроблено ✅" : "Позначити як зроблене"}
        </button>
      </div>
    </main>
  );
}

export default LessonPage;
