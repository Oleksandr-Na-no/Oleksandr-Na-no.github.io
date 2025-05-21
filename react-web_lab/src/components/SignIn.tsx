import { useState } from "react";
import {
  doPasswordReset,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  function onPasswordReset() {
    const email = prompt("Введіть свою пошту щоб скинути пароль");
    if (!email) {
      alert("Необхідна пошта");
      return;
    }
    doPasswordReset(email);
    alert("Перевір пошту щоб скинути пароль");
}

  const onGoogleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await doSignInWithGoogle();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Увійдіть в обліковий запис
      </h1>
      <form
        className="bg-white p-5 rounded-[10px] flex flex-col items-center gap-5 w-full max-w-md"
        onSubmit={onSubmit}
      >
        {error && (
          <div className="text-red-500 text-sm text-center w-full">{error}</div>
        )}

        <input
          type="email"
          placeholder="Пошта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-black w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <div className="w-full flex flex-col gap-3 items-center">
          <button
            type="submit"
            className="w-80 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-all duration-300"
          >
            Увійти
          </button>
          <button
            onClick={onGoogleSignIn}
            className="w-80 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-all duration-300"
          >
            Увійти з Google
          </button>
          <button
            onClick={onPasswordReset}
            className="w-80 bg-gray-200 hover:bg-gray-500 text-white py-2 rounded-md transition-all duration-300"
          >
            Забув пароль
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
