import { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Паролі не співпадають");
      return;
    }

    try {
      await doCreateUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Створіть обліковий запис
      </h1>
      <form
        className="bg-white p-5 rounded-[10px] flex flex-col items-center gap-5 w-full max-w-md"
        onSubmit={onSubmit}
      >
        {errorMessage && (
          <div className="text-red-500 text-sm text-center w-full">
            {errorMessage}
          </div>
        )}

        <input
          type="email"
          placeholder="Пошта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-black w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="text-black w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Підтвердіть пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="text-black w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="w-full flex justify-evenly gap-2.5">
          <button
            type="submit"
            className="w-80 bg-green-400 hover:bg-green-500 text-white py-2 rounded-md transition-all duration-300"
          >
            Створити
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
