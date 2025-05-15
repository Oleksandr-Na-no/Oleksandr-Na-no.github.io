import { doSignOut } from "../firebase/auth";
type Props = {};

function SingOut({}: Props) {
  return (
    <div>
      <button
        className="bg-red-600 rounded-xl p-2 hover:bg-red-500"
        onClick={() => doSignOut().catch((err) => console.log(err))}
      >
        Вийти
      </button>
    </div>
  );
}

export default SingOut;
