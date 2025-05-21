
import { useAuth } from '../context/authContext'
import LogOut from '../components/SignOut'
import { Navigate } from 'react-router-dom'
import { useState } from "react";
import { updateProfile } from "firebase/auth";

type Props = {}

function ProfilePage({}: Props) {
    const { userLoggedIn } = useAuth();
    const { currentUser } = useAuth();
    const [newName, setNewName] = useState("");

  return (
    <div className="bg-gradient-to-r from-[#4b6cb7] to-[#182848]  flex items-center h-svh w-full justify-center flex-col">
      {!userLoggedIn && <Navigate to="/login" replace={true} />}
      <div className="text-white mb-8">
        {currentUser ? (
          <div className=" flex flex-col items-center">
            <div className="text-2xl font-bold text-center text-White mb-2">
              {"Вітаю " + currentUser?.displayName}
            </div>
            <div className="font-bold text-center text-gray-800 pb-8">
              {currentUser.email}
            </div>
            <div className="gap-2.5 flex items-center w-full">
              <input
                type="text"
                placeholder="Нове Ім'я"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="text-black w-60 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                onClick={async () => {
                  if (newName && currentUser) {
                    await updateProfile(currentUser, { displayName: newName });
                    await currentUser.reload();
                    setNewName("");
                  }
                }}
                className="w-40 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-all duration-300 "
              >
                Змінити
              </button>
            </div>
          </div>
        ) : (
          "Pleace SingIn"
        )}
      </div>
      <LogOut />
    </div>
  );
}

export default ProfilePage