import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../common/Accordion';
import axios from 'axios';
import { toast } from 'sonner';

const CourseLessons = ({ courseId }: { courseId: string }) => {
    const [lessons, setLesssons] = useState<any[]>([])

    useEffect(() => {
        getLessons()
    }, [courseId])

    const getLessons = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/lesson/course/${courseId}`)
            setLesssons(res.data)
            console.log(lessons)
        } catch (err) {

        }
    }

    const handleCreateLesson = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/lesson`, {
                name: "Bài học mới",
                courseId,
                order: lessons.length
            })
            toast.promise(res.data, {
                loading: 'Đang cập nhật khóa học...',
                success: () => {
                    getLessons()
                    return 'Đã xuất bản khóa học thành công!';
                },
                error: 'Xuất bản khóa học thất bại.',
            })
        } catch (err) {

        }
    }

    return (
        <div className='border-t pt-3 border-gray-300'>
            <div className="flex items-center gap-4">
                <h2 >Giáo trình</h2>
                <button onClick={handleCreateLesson} className="px-4 py-1 bg-primary rounded-md hover:bg-primary/90 text-white">Thêm bài học</button>
            </div>
            <div className='mt-2 flex flex-col gap-2'>
                {lessons && lessons.map((lesson) => {
                    return (
                        <Accordion key={lesson._id} defaultValue={undefined}>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    {lesson.name}
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )
                })}

            </div>

        </div>
    )
}

export default CourseLessons