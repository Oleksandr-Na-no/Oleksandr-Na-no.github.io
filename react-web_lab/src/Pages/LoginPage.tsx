import { useState } from "react";
import SignIn from "./../components/SignIn";
import SignUp from "./../components/SignUp";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

function SignInPage() {
  const { userLoggedIn } = useAuth();
  const [showSignInOrUp, setshowSignInOrUp] = useState(true);

  return (
    <div>
      {userLoggedIn && <Navigate to="/" replace={true} />}
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-md w-full p-6">
          <div>{showSignInOrUp ? <SignIn /> : <SignUp />}</div>

          <div className="text-center">
            <button
              onClick={() => setshowSignInOrUp(!showSignInOrUp)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showSignInOrUp
                ? "Немає облікового запису? Зареєструватися"
                : "Вже маєте обліковий запис? Увійти"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
