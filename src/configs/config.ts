import { EStatus } from "./enum";

export const courseStatusConfig = {
    [EStatus.Draft]: {
        label: 'Bản nháp',
        description: 'Khóa học này đang ở chế độ bản nháp. Học viên chưa thể nhìn thấy nội dung này.',
        color: 'text-yellow-700',
        bg: 'bg-yellow-100'
    },
    [EStatus.Public]: {
        label: 'Đã xuất bản',
        description: 'Khóa học đã được xuất bản và hiển thị cho học viên.',
        color: 'text-green-700',
        bg: 'bg-green-100'
    },
    [EStatus.Delete]: {
        label: "Đã xóa",
        description: 'Khóa học này không còn được sử dụng trên hệ thống này.',
        color: 'text-red-700',
        bg: 'bg-red-100'
    }
};