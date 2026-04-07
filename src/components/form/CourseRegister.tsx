import axios from "axios";
import { Book } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CourseRegister = () => {
    // 1. Khởi tạo useForm
    const { register, handleSubmit, reset } = useForm();

    // 2. Hàm xử lý khi submit form
    const onSubmit = async (data: any) => {
        // Tạo một promise để toast tracking
        const promise = axios.post(`${import.meta.env.VITE_API_URL}/course`, data);

        toast.promise(promise, {
            loading: "Đang tạo khóa học...",
            success: () => {
                reset(); // Xóa trắng form sau khi thành công
                return "Khóa học đã được tạo thành công!";
            },
            error: (err: any) => {
                return err.response?.data?.message || "Có lỗi xảy ra khi tạo khóa học.";
            },
        });
    };

    return (
        <div className="max-w-lg mx-auto p-4 ">
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                <Book /> Tạo khóa học
            </h2>
            <p className="text-text-secondary">Điền thông tin dưới đây để tạo khóa học mới</p>
            <hr className="my-2 text-text-secondary" />

            {/* 3. Truyền handleSubmit(onSubmit) vào onSubmit của form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                    <label htmlFor="name" className="block text-text-secondary font-bold">Tên khóa học</label>
                    <input
                        className="input_primary text-text-primary w-full border p-2 rounded"
                        {...register("name", { required: true })}
                    />
                </div>

                <div>
                    <label htmlFor="slug" className="block text-text-secondary font-bold">Id Khóa học</label>
                    <input
                        className="input_primary w-full border p-2 rounded"
                        {...register("slug", { required: true })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="minAge" className="block text-text-secondary font-bold">Tuổi tối thiểu</label>
                        <input
                            type="number"
                            className="input_primary w-full border p-2 rounded"
                            {...register("minAge", { valueAsNumber: true })}
                        />
                    </div>
                    <div>
                        <label htmlFor="maxAge" className="block text-text-secondary font-bold">Tuổi tối đa</label>
                        <input
                            type="number"
                            className="input_primary w-full border p-2 rounded"
                            {...register("maxAge", { valueAsNumber: true })}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-text-secondary font-bold">Mô tả khóa học</label>
                    <textarea
                        className="input_primary w-full border p-2 rounded"
                        rows={4}
                        {...register("description")}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
                >
                    Đăng ký khóa học
                </button>
            </form>
        </div>
    );
};

export default CourseRegister;