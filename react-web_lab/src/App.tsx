import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout.tsx';
import MainPage from './Pages/MainPage.tsx';
import LessonsPage from "./Pages/LessonsPage.tsx";
import LessonPage from "./Pages/LessonPage.tsx";
import GalleryPage from './Pages/GalleryPage.tsx';
import ProgressPage from './Pages/ProgressPage.tsx';
import LoginPage from './Pages/LoginPage.tsx';
import ProfilePage from './Pages/ProfilePage.tsx';
function App() {
 return (
   <Router>
     <Routes>
       <Route element={<Layout />}>
         <Route path="/" element={<MainPage />} />
         <Route path="/lessons" element={<LessonsPage />} />
         <Route path="/lesson/:id" element={<LessonPage />} />
         <Route path="/gallery" element={<GalleryPage />} />
         <Route path="/progress" element={<ProgressPage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/profile" element={<ProfilePage />} />
       </Route>
     </Routes>
   </Router>
 );
}

export default App
