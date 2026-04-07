import { Plus, Search } from "lucide-react"
import Mainlayout from "../../layout/Mainlayout"
import CourseItem from "../../components/CourseItem"
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import CourseRegister from "../../components/form/CourseRegister";
import axios from "axios";

const CourseManage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [course, setCourse] = useState<any[]>([]);

    useEffect(() => {
        handleGetCourse()
    }, []);

    const handleGetCourse = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/course`);
            setCourse(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        handleGetCourse(); // Refresh course list after closing modal
    }
    return (
        <Mainlayout>
            <div className="flex justify-between items-end">
                <div className="w-[60%]">
                    <h1 className="text-2xl font-bold">Quản lý khóa học</h1>
                    <p>Xem và quản lý tất cả các khóa học của trung tâm tại đây. Tối ưu hóa trải nghiệm học tập cho người dùng thông qua các công cụ hỗ trợ.</p>
                </div>

                <div>
                    <button onClick={() => setIsOpen(true)}
                        className="flex gap-1 px-4 py-3 bg-linear-to-r from-primary to-primary/20 hover:bg-linear-to-l transition-all duration-300 rounded-full cursor-pointer text-white font-medium hover:shadow-md "><Plus /> Thêm khóa học</button>
                </div>
            </div>
            <div className="mt-5">
                {/* filter  */}
                <div>
                    <div className="flex items-center w-[30%] px-4 py-2  border border-gray-200 rounded-full focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all shadow-sm">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học..."
                            className="ml-3 bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400"
                        />
                    </div>


                </div>
                {/* end filter  */}

                {/* list course */}
                <div className="mt-5 grid grid-cols-4 gap-3">
                    {course && course?.map((item: any) => (
                        <CourseItem key={item.id} course={item} />
                    ))}

                </div>
                {/* end list course */}

            </div>

            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <CourseRegister />
            </Modal>

        </Mainlayout >
    )
}

export default CourseManage