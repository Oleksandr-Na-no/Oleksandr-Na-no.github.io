// src/components/ProgressTable.tsx
import React from "react";
import { format } from "date-fns";

export type Lesson = {
  id: number;
  name: string;
};

export interface LessonProgress {
  completed?: boolean;
  date: Date | null;
}

export interface LessonsProgressMap {
  [key: number]: LessonProgress;
}

const formatDate = (date: Date | null): string => {
  if (!date || isNaN(date.getTime())) return "-";
  try {
    return format(date, "dd.MM.yyyy");
  } catch {
    return "-";
  }
};

type ProgressTableProps = {
  lessons: Lesson[];
  lessonsProgress: LessonsProgressMap;
};

const ProgressTable: React.FC<ProgressTableProps> = ({
  lessons,
  lessonsProgress,
}) => (
  <div className="w-full flex flex-col items-center rounded-xl border-2 border-white overflow-hidden mt-6">
    <table className="w-full table-auto text-left">
      <thead>
        <tr className="bg-gray-900">
          <th className="px-4 py-2 w-32 text-center">Статус</th>
          <th className="border-l px-4 py-2">Назва уроку</th>
          <th className="border-l px-4 py-2 w-40">Дата</th>
        </tr>
      </thead>
      <tbody>
        {lessons.map((lesson) => {
          const progress = lessonsProgress[lesson.id];
          const done = progress?.completed ?? false;
          const date = progress?.date ?? null;

          return (
            <tr key={lesson.id} className="hover:bg-gray-100">
              <td className="border-t px-4 py-2 text-center text-xl">
                {done ? "✅" : "❌"}
              </td>
              <td className="border-l border-t px-4 py-2">{lesson.name}</td>
              <td className="border-l border-t px-4 py-2">
                {formatDate(date)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default ProgressTable;
