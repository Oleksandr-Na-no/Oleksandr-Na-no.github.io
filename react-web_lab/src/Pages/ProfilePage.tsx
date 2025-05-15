
import { useAuth } from '../context/authContext'
import LogOut from '../components/SignOut'
import { Navigate } from 'react-router-dom'

type Props = {}

function ProfilePage({}: Props) {
    const { userLoggedIn } = useAuth();
    const { currentUser } = useAuth();

  return (
    <div className="bg-gradient-to-r from-[#4b6cb7] to-[#182848]  flex items-center h-svh w-full justify-center flex-col">
      {!userLoggedIn && <Navigate to="/login" replace={true} />}
      <div className="text-white mb-8">
        {currentUser ? currentUser.email : "Pleace SingIn"}
      </div>
      <LogOut />
    </div>
  );
}

export default ProfilePage