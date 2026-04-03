import './App.css'
import SideBar from './layout/SideBar'
import CourseManage from './pages/CourseManage'

function App() {

  return (
    <>
      <main className="grid grid-cols-[200px_1fr] gap-2 bg-bg h-screen p-3 rounded-md">
        <SideBar />
        <CourseManage />
      </main>
    </>
  )
}

export default App
