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
  dateLine: Date | null;
}

export interface LessonsProgressMap {
  [key: number]: LessonProgress;
}

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
          <th className="px-4 py-2 w-16 text-center">Статус</th>
          <th className="border-l px-4 py-2 w-128">Назва уроку</th>
          <th className="border-l px-4 py-2 w-32">Дата</th>
          <th className="border-l px-4 py-2 w-32">Дедлайн</th>
        </tr>
      </thead>
      <tbody>
        {lessons.map((lesson) => {
          const progress = lessonsProgress[lesson.id];

          const done = progress?.completed ?? false;

          // Safely convert dates
          const date = convertToDate(progress?.date);
          const dateLine = convertToDate(progress?.dateLine);

          return (
            <tr key={lesson.id}>
              <td className="border-t px-4 py-2 text-center text-xl">
                {done ? "✅" : "❌"}
              </td>
              <td className="border-l border-t px-4 py-2">{lesson.name}</td>
              <td className="border-l border-t px-4 py-2">
                {formatDate(date)}
              </td>
              <td className="border-l border-t px-4 py-2">
                {formatDate(dateLine)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default ProgressTable;
