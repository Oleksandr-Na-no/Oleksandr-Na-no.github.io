import React, { useEffect, useState, useRef } from "react";

type Props = {
  number: number;
  isDone: boolean;
};

function LessonDoneAlert({ number, isDone }: Props) {
  const [showAlert, setShowAlert] = useState(false);
  const isFirstRender = useRef(0);

  useEffect(() => {
    if (isFirstRender.current < 2) {
      isFirstRender.current++;
      return;
    }

    if (isDone) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isDone]);

  return (
    <div
      className={`fixed top-22 left-1/2 -translate-x-1/2 shadow-2xl text-center max-w-[300px] z-50 bg-green-500 text-white text-lg rounded-md font-bold p-3 transition-opacity ${
        showAlert
          ? "opacity-100 duration-100"
          : "duration-500 opacity-0 pointer-events-none"
      }`}
    >
      Lesson {number} completed 😊
    </div>
  );
}

export default LessonDoneAlert;
