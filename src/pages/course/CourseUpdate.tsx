import { useParams } from 'react-router-dom';
import Mainlayout from '../../layout/Mainlayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import type { Course } from '../../configs/types';
import NotFound from '../NotFound';
import { courseStatusConfig } from '../../configs/config';
import { EStatus } from '../../configs/enum';

const CourseUpdate = () => {
    const { id } = useParams();
    const [course, setCourse] = useState<Course | null>(null);

    // Quản lý trường nào đang được sửa (ví dụ: 'name', 'slug', 'description'...)
    const [editingField, setEditingField] = useState<string | null>(null);

    useEffect(() => {
        handleGetCourse();
    }, [id]);

    const handleGetCourse = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/course/${id}`);
            setCourse(response.data);
        } catch (error) {
            console.error('Error fetching course:', error);
            toast.error("Không thể tải thông tin khóa học");
        }
    };

    // Hàm cập nhật giá trị input vào state course
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCourse((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateCourse = async () => {
        if (course!.minAge >= course!.maxAge || course!.minAge < 0 || course!.maxAge < 0) {
            toast.error('Cập nhật thất bại do độ tuổi không hợp lệ  .')
            return;
        }
        const updatePromise = axios.patch(`${import.meta.env.VITE_API_URL}/course/${id}`, {
            name: course!.name,
            slug: course!.slug,
            minAge: Number(course!.minAge),
            maxAge: Number(course!.maxAge),
            description: course!.description,
        });

        toast.promise(updatePromise, {
            loading: 'Đang cập nhật khóa học...',
            success: (res) => {
                setCourse(res.data);
                setEditingField(null); // Đóng chế độ chỉnh sửa
                return 'Cập nhật thành công!';
            },
            error: 'Cập nhật thất bại.',
        });

        try {
            await updatePromise;
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const cancelEdit = () => {
        setEditingField(null);
        handleGetCourse();
    };

    const handleDeleteCourse = async () => {
        try {
            if (confirm(`Bạn chắc chắn xóa khóa học: ${course?.name}`)) {
                const respond = await axios.patch(`${import.meta.env.VITE_API_URL}/course/${id}`, {
                    status: EStatus.Delete
                });

                toast.promise(respond.data, {
                    loading: 'Đang cập nhật khóa học...',
                    success: () => {
                        handleGetCourse()
                        return 'Đã xóa khóa học thành công!';
                    },
                    error: 'Xóa khóa học thất bại.',
                })
            }
        } catch (err) {

        }
    }

    const handlePublicCourse = async () => {
        try {
            if (confirm(`Bạn chắc chắn xuất bản khóa học: ${course?.name}`)) {
                const respond = await axios.patch(`${import.meta.env.VITE_API_URL}/course/${id}`, {
                    status: EStatus.Public
                });

                toast.promise(respond.data, {
                    loading: 'Đang cập nhật khóa học...',
                    success: () => {
                        handleGetCourse()
                        return 'Đã xuất bản khóa học thành công!';
                    },
                    error: 'Xuất bản khóa học thất bại.',
                })
            }
        } catch (err) {

        }
    }

    if (!id || !course) return <NotFound />

    return (
        <Mainlayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-primary">Cập nhật khóa học</h1>
                <p className="text-gray-500">Điều chỉnh thông tin và nội dung của khóa học</p>
            </div>
            <hr className="text-gray-300 my-4" />

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] w-full gap-8">
                <div className="space-y-6">

                    {/* Phần Tiêu đề */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold ">Tiêu đề khóa học</label>
                        {editingField !== 'name' ? (
                            <div className="flex group items-center justify-between p-3 bg-bg rounded-lg border border-transparent hover:border-primary/30 transition-all">
                                <h2 className="font-semibold text-xl">{course?.name || "Chưa có tiêu đề"}</h2>
                                <button onClick={() => setEditingField('name')} className="p-2 opacity-0 group-hover:opacity-100 hover:bg-primary/10 rounded-full text-gray-400 hover:text-primary transition-all">
                                    <Pencil size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <input name="name" type="text" value={course?.name || ""} onChange={handleChange} className='input_primary w-full' autoFocus />
                                <button onClick={handleUpdateCourse} className="text-primary p-1"><Check size={18} /></button>
                                <button onClick={cancelEdit} className="text-primary p-1"><X size={18} /></button>
                            </div>
                        )}
                    </div>

                    {/* Phần Slug & Độ tuổi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm  ">Đường dẫn (Slug)</label>
                            {editingField !== 'slug' ? (
                                <div onClick={() => setEditingField('slug')} className="group flex items-center justify-between p-2 border rounded-md cursor-pointer">
                                    <span className="text-sm">{course?.slug}</span>
                                    <Pencil className="h-full p-1 opacity-0 group-hover:opacity-100 hover:bg-primary/10 rounded-full text-gray-400 hover:text-primary transition-all" />
                                </div>
                            ) : (
                                <div className="flex gap-1">
                                    <input name="slug" type="text" value={course?.slug || ""} onChange={handleChange} autoFocus className='input_primary text-sm w-full' />
                                    <button onClick={handleUpdateCourse} className="text-primary p-1"><Check size={18} /></button>
                                    <button onClick={cancelEdit} className="text-primary p-1"><X size={18} /></button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm ">Độ tuổi học viên</label>
                            <div className="flex items-center gap-3">
                                {/* Min Age */}
                                {editingField !== 'minAge' ? (
                                    <div onClick={() => setEditingField('minAge')} className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
                                        <span className="text-sm text-nowrap">{course?.minAge} tuổi</span>
                                    </div>
                                ) : (
                                    <input name="minAge" type="number" value={course?.minAge || ""} onChange={handleChange} className='input_primary w-20 text-sm' autoFocus />
                                )}
                                <span>đến</span>
                                {/* Max Age */}
                                {editingField !== 'maxAge' ? (
                                    <div onClick={() => setEditingField('maxAge')} className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
                                        <span className="text-sm text-nowrap">{course?.maxAge} tuổi</span>
                                    </div>
                                ) : (
                                    <input name="maxAge" type="number" value={course?.maxAge || ""} onChange={handleChange} className='input_primary w-20 text-sm' autoFocus />
                                )}
                                {(editingField === 'minAge' || editingField === 'maxAge') && (
                                    <>
                                        <button onClick={handleUpdateCourse} className="text-primary p-1"><Check size={18} /></button>
                                        <button onClick={cancelEdit} className="text-primary p-1"><X size={18} /></button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Phần Mô tả */}
                    <div className="space-y-2">
                        <div className='flex justify-between items-center'>
                            <label className="text-sm ">Mô tả khóa học</label>
                            {editingField !== 'description' && (
                                <button onClick={() => setEditingField('description')} className="text-primary text-sm flex items-center gap-1 hover:underline">
                                    <Pencil size={14} /> Chỉnh sửa
                                </button>
                            )}
                        </div>
                        {editingField !== 'description' ? (
                            <div className="p-4 bg-bg border rounded-lg">
                                <p className="text-sm text-text-secondary whitespace-pre-wrap">{course?.description || "Chưa có mô tả..."}</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <textarea name="description" value={course?.description || ""} onChange={handleChange} className='input_primary w-full h-40' />
                                <div className="flex gap-2 justify-end">
                                    <button onClick={cancelEdit} className="px-4 py-2 bg-bg border rounded-md text-sm">Hủy</button>
                                    <button onClick={handleUpdateCourse} className="px-4 py-2 bg-primary text-white rounded-md text-sm">Lưu mô tả</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='border-t pt-3 border-gray-300'>
                        <div className="flex items-center gap-4">
                            <h2 >Giáo trình</h2>
                            <button className="px-4 py-1 bg-primary rounded-md hover:bg-primary/90 text-white">Thêm bài học</button>
                        </div>

                    </div>
                </div>

                {/* Sidebar bổ sung */}
                <div className='space-y-4'>
                    <div className={`text-xs px-4 py-2 rounded-md border border-gray-bg ${courseStatusConfig[course.status].color}  ${courseStatusConfig[course.status].bg}  `}>
                        <h3 className="font-semibold  mb-2">{courseStatusConfig[course.status].label}</h3>
                        <p >{courseStatusConfig[course.status].description}</p>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <button className='bg-primary text-white px-4 py-1 rounded-md hover:bg-primary/90' onClick={handlePublicCourse}>Xuất bản</button>
                        { }
                        <button className='bg-bg px-4 py-1 border rounded-md hover:bg-bg/90' onClick={handleDeleteCourse}>Xóa</button>
                    </div>
                    <div className='bg-gray-100 h-40 rounded-lg flex items-center justify-center border-dashed border-2 border-gray-300'>
                        <span className="text-gray-400 text-sm">Hình ảnh khóa học</span>
                    </div>
                </div>
            </div>
        </Mainlayout>
    );
};

export default CourseUpdate;