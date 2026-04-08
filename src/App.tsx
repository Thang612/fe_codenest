import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import SideBar from './layout/SideBar'
import CourseManage from './pages/course/CourseManage'
import { Toaster } from 'sonner';
import NotFound from './pages/NotFound';
import CourseUpdate from './pages/course/CourseUpdate';

function App() {

  return (
    <>
      <BrowserRouter>
        <main className="grid grid-cols-[200px_1fr] gap-2 bg-bg h-screen p-3 rounded-md">
          <SideBar />

          <Routes>
            <Route path="/courses" element={<CourseManage />} />
            <Route path="/courses/:id" element={<CourseUpdate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
