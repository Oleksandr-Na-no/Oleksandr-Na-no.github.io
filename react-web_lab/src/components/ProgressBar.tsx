
type Props = {
  percent: number;
};

function ProgressBar({ percent }: Props) {
  return (
    <>
      <h2 className="text-2xl mb-4">Пройдено {percent}%</h2>

      <div className="w-full h-6 bg-gray-300 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </>
  );
}

export default ProgressBar