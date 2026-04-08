import { Eye, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Course } from '../configs/types'

const CourseItem = ({ course }: { course: Course }) => {

    const route = useNavigate()

    return (
        <div className=" group bg-card rounded-lg" >
            <div className=" relative h-35 bg-gray-200 rounded-lg overflow-hidden   ">
                <div className="hidden group-hover:flex w-fit absolute bg-surface px-2 py-1 rounded-full right-2 top-2 gap-2">
                    <Eye onClick={() => route(`/courses/${course._id}`)} className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" />
                    <Trash onClick={() => console.log('Delete course')} className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
                </div>

                <img src="https://www.codingal.com/resources/wp-content/uploads/2021/06/Scratch-for-kids_banner-1.jpg" className='object-cover w-full h-full' alt="" />
            </div>
            <div className="flex-1 px-4 py-4     ">
                <div className='flex justify-between items-start'>
                    <h2 className=" font-medium">{course.name}</h2>
                    <div className='bg-primary/10 px-2 py-1 text-nowrap rounded-md text-xs text-primary'>{course.minAge} - {course.maxAge} tuổi</div>
                </div>
                <p className="text-xs text-text-secondary line-clamp-2">{course.description}</p>
            </div>
        </div>
    )
}

export default CourseItem