import { useEffect, useState } from "react";
import { getAuth, getIdToken } from "firebase/auth";
import ProgressBar from "../components/ProgressBar";
import ProgressTable, {
  Lesson,
  LessonsProgressMap,
} from "../components/ProgressTable";
import { useAuth } from "../context/authContext";
import { beckEndServerUrl } from "../../settings";

const convertFirebaseTimestampToDate = (timestamp: any): Date | null => {
  if (!timestamp) return null;
  const seconds = timestamp.seconds ?? timestamp._seconds;
  const date = new Date(seconds * 1000);
  return isNaN(date.getTime()) ? null : date;
};

function ProgressPage() {
  const { userLoggedIn } = useAuth();
  const [lessonsProgress, setLessonsProgress] = useState<LessonsProgressMap>(
    {}
  );
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchLessons() {
      if (!userLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const progressData = await getAllLessons();

        if (progressData) {
          const normalizedProgress: LessonsProgressMap = {};
          for (const [key, value] of Object.entries(
            progressData.userProgress
          )) {
            normalizedProgress[Number(key)] = {
              completed: value.completed,
              date: convertFirebaseTimestampToDate(value.date),
            };
          }
          setLessonsProgress(normalizedProgress);
          setAllLessons(progressData.allLessons || []);
        }
      } catch (error) {
        console.error("Error loading lessons:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, [userLoggedIn]);

  async function getAllLessons(): Promise<
    { userProgress: LessonsProgressMap; allLessons: Lesson[] } | undefined
  > {
    const user = getAuth().currentUser;
    if (!user) return { userProgress: {}, allLessons: [] };

    try {
      const token = await getIdToken(user);
      const response = await fetch(`${beckEndServerUrl}/user/lesson/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      return {
        userProgress: data.userProgress || {},
        allLessons: data.allLessons || [],
      };
    } catch (error) {
      console.error("Error fetching lessons:", error);
      return { userProgress: {}, allLessons: [] };
    }
  }

  const completedCount = Object.values(lessonsProgress).filter(
    (l) => l.completed
  ).length;
  const percent =
    allLessons.length > 0 ? (completedCount / allLessons.length) * 100 : 0;

  if (loading && userLoggedIn) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Прогрес завантажується...</p>
      </div>
    );
  }

  return (
    <>
      {userLoggedIn ? (
        <div className="w-full max-w-[600px] h-full flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl mb-16">Твій прогрес</h1>
          <ProgressBar percent={percent} />
          <ProgressTable
            lessons={allLessons}
            lessonsProgress={lessonsProgress}
          />
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
